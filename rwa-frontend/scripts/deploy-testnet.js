const StellarSdk = require('@stellar/stellar-sdk');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

async function createTestAccount() {
  try {
    // Yeni bir keypair oluştur
    const pair = StellarSdk.Keypair.random();
    
    console.log('Yeni hesap oluşturuluyor...');
    console.log('Public Key:', pair.publicKey());
    console.log('Secret Key:', pair.secret());
    
    // Testnet'ten XLM al
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`
    );
    const responseJSON = await response.json();
    
    if (responseJSON.status === 'success') {
      console.log('Testnet hesabı başarıyla oluşturuldu!');
      console.log('Friendbot yanıtı:', responseJSON);
    } else {
      console.error('Hesap oluşturma hatası:', responseJSON);
    }
    
    return pair;
  } catch (error) {
    console.error('Hata:', error);
    throw error;
  }
}

async function deployContract(pair) {
  try {
    // Hesap bilgilerini al
    const account = await server.loadAccount(pair.publicKey());
    
    // Token oluştur
    const asset = new StellarSdk.Asset('SPACETOKEN', pair.publicKey());
    
    // Sadece trustline oluştur
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(
        StellarSdk.Operation.changeTrust({
          asset: asset,
          limit: '1000000000'
        })
      )
      .setTimeout(30)
      .build();
    
    // İşlemi imzala
    transaction.sign(pair);
    
    // İşlemi gönder
    const result = await server.submitTransaction(transaction);
    console.log('Trustline başarıyla oluşturuldu!');
    console.log('İşlem hash:', result.hash);
    
    return result;
  } catch (error) {
    console.error('Deploy hatası:', error);
    throw error;
  }
}

async function main() {
  try {
    // Test hesabı oluştur
    const pair = await createTestAccount();
    
    // Biraz bekle (hesabın oluşturulması için)
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Kontratı deploy et
    await deployContract(pair);
    
  } catch (error) {
    console.error('Ana hata:', error);
  }
}

main(); 