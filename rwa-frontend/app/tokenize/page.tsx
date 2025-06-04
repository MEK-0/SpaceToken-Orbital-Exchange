'use client';

import { useState } from 'react';
import { useWalletStore } from '@/stores/wallet';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Rocket, 
  Satellite,
  Globe,
  FileText, 
  Shield, 
  Clock,
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
  AlertCircle,
  Coins,
  Briefcase,
  Database,
  Info
} from 'lucide-react';
import { formatCurrency } from '@/lib/stellar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const ASSET_TYPES = [
  {
    id: 'cubesat',
    name: 'CubeSat',
    description: 'Küçük uydu sistemleri ve uzay araçları',
    icon: Satellite,
    minValue: 100000,
    examples: ['6U CubeSat', '3U CubeSat', 'Uzaktan Algılama', 'İletişim']
  },
  {
    id: 'nanosat',
    name: 'NanoSat',
    description: 'Nano boyutlu uydu sistemleri',
    icon: Rocket,
    minValue: 50000,
    examples: ['İletişim', 'Veri Aktarımı', 'Ar-Ge', 'Test']
  },
  {
    id: 'ground_station',
    name: 'Yer İstasyonu',
    description: 'Uydu kontrol ve veri alım istasyonları',
    icon: Globe,
    minValue: 500000,
    examples: ['Kontrol Merkezi', 'Veri Alım', 'İletişim', 'Takip']
  },
  {
    id: 'research',
    name: 'Ar-Ge Projesi',
    description: 'Derin uzay araştırma ve keşif projeleri',
    icon: Database,
    minValue: 1000000,
    examples: ['Derin Uzay', 'Mars Keşif', 'Asteroid Madenciliği', 'Uzay Kolonisi']
  }
];

const TOKENIZATION_STEPS = [
  {
    id: 1,
    title: 'Uydu Bilgileri',
    description: 'Uydu veya projenizin temel bilgilerini girin'
  },
  {
    id: 2,
    title: 'Teknik Detaylar',
    description: 'Teknik özellikler ve sistem detayları'
  },
  {
    id: 3,
    title: 'Yasal ve Güvenlik',
    description: 'Uzay lisansları ve güvenlik sertifikaları'
  },
  {
    id: 4,
    title: 'Finansal Model',
    description: 'Token ekonomisi ve dağıtım planı'
  },
  {
    id: 5,
    title: 'Tokenizasyon',
    description: 'Son kontroller ve token yayınlama'
  }
];

export default function TokenizePage() {
  const { isConnected, address } = useWalletStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Uydu Bilgileri
    assetType: '',
    assetName: '',
    orbit: '',
    description: '',
    totalValue: '',
    
    // Step 2: Teknik Detaylar
    technicalSpecs: null as File | null,
    systemDesign: null as File | null,
    testResults: null as File | null,
    
    // Step 3: Yasal ve Güvenlik
    launchLicense: null as File | null,
    frequencyLicense: null as File | null,
    safetyCert: null as File | null,
    
    // Step 4: Finansal Model
    tokenSymbol: '',
    totalSupply: '',
    pricePerToken: '',
    minInvestment: '',
    
    // Step 5: Tokenizasyon
    launchDate: '',
    fundingGoal: '',
    fundingDeadline: ''
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < TOKENIZATION_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateTokenomics = () => {
    if (!formData.totalValue || !formData.totalSupply) return null;
    
    const totalVal = parseFloat(formData.totalValue);
    const supply = parseFloat(formData.totalSupply);
    const pricePerToken = totalVal / supply;
    
    return {
      pricePerToken: pricePerToken.toFixed(2),
      marketCap: totalVal,
      minInvestmentTokens: formData.minInvestment ? Math.ceil(parseFloat(formData.minInvestment) / pricePerToken) : 0
    };
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Uydu Tipi</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ASSET_TYPES.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer transition-all ${
                        formData.assetType === type.id 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => updateFormData('assetType', type.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold mb-2">{type.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                        <Badge variant="outline">Min: {formatCurrency(type.minValue.toString())}</Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="assetName">Uydu Adı</Label>
                <Input
                  id="assetName"
                  placeholder="örn: Stellar-1 CubeSat"
                  value={formData.assetName}
                  onChange={(e) => updateFormData('assetName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="orbit">Yörünge</Label>
                <Input
                  id="orbit"
                  placeholder="örn: Alçak Dünya Yörüngesi"
                  value={formData.orbit}
                  onChange={(e) => updateFormData('orbit', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Uydu Açıklaması</Label>
              <Textarea
                id="description"
                placeholder="Uydunuzun detaylı açıklaması, özellikleri ve yatırım potansiyeli..."
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                className="min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="totalValue">Toplam Değer (USD)</Label>
              <Input
                id="totalValue"
                type="number"
                placeholder="2500000"
                value={formData.totalValue}
                onChange={(e) => updateFormData('totalValue', e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Profesyonel değerleme veya piyasa değeri baz alınarak
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Tüm teknik dokümanlar uzman ekibimiz tarafından incelenecektir.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Teknik Özellikler
                  </CardTitle>
                  <CardDescription>
                    Uydu sistemleri ve bileşenlerinin teknik detayları
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      PDF veya DOCX formatında teknik döküman yükleyin
                    </p>
                    <Button variant="outline" size="sm">
                      Dosya Seç
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Sistem Tasarımı
                  </CardTitle>
                  <CardDescription>
                    Uydu sisteminin mimari ve tasarım dokümanları
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Sistem tasarım ve mimari dokümanları
                    </p>
                    <Button variant="outline" size="sm">
                      Dosya Seç
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Uzay lisansları ve güvenlik sertifikaları zorunludur
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Fırlatma Lisansı
                  </CardTitle>
                  <CardDescription>
                    Uydu fırlatma izinleri ve lisansları
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Fırlatma lisansı ve izinleri
                    </p>
                    <Button variant="outline" size="sm">
                      Dosya Seç
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Frekans Lisansı
                  </CardTitle>
                  <CardDescription>
                    İletişim frekansları ve spektrum izinleri
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Frekans lisansı ve izinleri
                    </p>
                    <Button variant="outline" size="sm">
                      Dosya Seç
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="tokenSymbol">Token Sembolü</Label>
                <Input
                  id="tokenSymbol"
                  placeholder="örn: STL1"
                  value={formData.tokenSymbol}
                  onChange={(e) => updateFormData('tokenSymbol', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="totalSupply">Toplam Token Arzı</Label>
                <Input
                  id="totalSupply"
                  type="number"
                  placeholder="1000000"
                  value={formData.totalSupply}
                  onChange={(e) => updateFormData('totalSupply', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pricePerToken">Token Fiyatı (USD)</Label>
                <Input
                  id="pricePerToken"
                  type="number"
                  placeholder="2.50"
                  value={formData.pricePerToken}
                  onChange={(e) => updateFormData('pricePerToken', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="minInvestment">Minimum Yatırım (USD)</Label>
                <Input
                  id="minInvestment"
                  type="number"
                  placeholder="1000"
                  value={formData.minInvestment}
                  onChange={(e) => updateFormData('minInvestment', e.target.value)}
                />
              </div>
            </div>

            {calculateTokenomics() && (
              <Card>
                <CardHeader>
                  <CardTitle>Token Ekonomisi Özeti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Token Fiyatı</p>
                      <p className="text-lg font-bold">{formatCurrency(calculateTokenomics()!.pricePerToken)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Piyasa Değeri</p>
                      <p className="text-lg font-bold">{formatCurrency(calculateTokenomics()!.marketCap.toString())}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Min. Token</p>
                      <p className="text-lg font-bold">{calculateTokenomics()!.minInvestmentTokens}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Tokenizasyon tarihlerini ve hedeflerini belirleyin
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="launchDate">Fırlatma Tarihi</Label>
                <Input
                  id="launchDate"
                  type="date"
                  value={formData.launchDate}
                  onChange={(e) => updateFormData('launchDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fundingGoal">Finansman Hedefi (USD)</Label>
                <Input
                  id="fundingGoal"
                  type="number"
                  placeholder="1000000"
                  value={formData.fundingGoal}
                  onChange={(e) => updateFormData('fundingGoal', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="fundingDeadline">Finansman Son Tarihi</Label>
              <Input
                id="fundingDeadline"
                type="date"
                value={formData.fundingDeadline}
                onChange={(e) => updateFormData('fundingDeadline', e.target.value)}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tokenizasyon Özeti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uydu Tipi</span>
                    <span className="font-medium">{ASSET_TYPES.find(t => t.id === formData.assetType)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uydu Adı</span>
                    <span className="font-medium">{formData.assetName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Yörünge</span>
                    <span className="font-medium">{formData.orbit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Token Sembolü</span>
                    <span className="font-medium">{formData.tokenSymbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Toplam Arz</span>
                    <span className="font-medium">{formData.totalSupply}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Token Fiyatı</span>
                    <span className="font-medium">{formatCurrency(formData.pricePerToken)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">Wallet Required</h2>
              <p className="text-muted-foreground mb-4">
                Connect your wallet to start the tokenization process
              </p>
              <Button className="w-full">Connect Wallet</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Uydu Tokenize Et</h1>
            <p className="text-xl text-muted-foreground">
              Uydu veya uzay projenizi tokenize edin ve yatırımcılarla buluşturun
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {TOKENIZATION_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep > step.id 
                      ? 'bg-primary text-primary-foreground' 
                      : currentStep === step.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  {index < TOKENIZATION_STEPS.length - 1 && (
                    <div className={`w-24 h-1 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <Progress value={(currentStep / TOKENIZATION_STEPS.length) * 100} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{TOKENIZATION_STEPS[currentStep - 1].title}</CardTitle>
              <CardDescription>
                {TOKENIZATION_STEPS[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === TOKENIZATION_STEPS.length}
            >
              {currentStep === TOKENIZATION_STEPS.length ? 'Tamamla' : 'İleri'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 