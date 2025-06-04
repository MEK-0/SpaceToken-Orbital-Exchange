'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Rocket, 
  Satellite,
  Globe,
  Database,
  Search,
  Filter,
  ArrowRight,
  Users,
  Coins,
  Calendar,
  Shield,
  AlertCircle
} from 'lucide-react';
import { formatCurrency } from '@/lib/stellar';

// Mock marketplace data
const MOCK_ASSETS = [
  {
    id: 1,
    name: 'Stellar-1 CubeSat',
    location: 'Alçak Dünya Yörüngesi',
    type: 'CubeSat',
    description: '6U CubeSat, uzaktan algılama ve görüntüleme yetenekleri',
    totalValue: 2500000,
    availableTokens: 750000,
    pricePerToken: 2.50,
    projectedYield: 8.5,
    riskLevel: 'Orta',
    status: 'Aktif',
    images: ['/assets/satellite1.jpg'],
    launchDate: '2024-12-15',
    investors: 45
  },
  {
    id: 2,
    name: 'Orbital-1 NanoSat',
    location: 'Orta Dünya Yörüngesi',
    type: 'NanoSat',
    description: 'İletişim odaklı nano uydu sistemi',
    totalValue: 5000000,
    availableTokens: 2000000,
    pricePerToken: 5.00,
    projectedYield: 9.2,
    riskLevel: 'Yüksek',
    status: 'Yakında',
    images: ['/assets/satellite2.jpg'],
    launchDate: '2025-03-01',
    investors: 28
  },
  {
    id: 3,
    name: 'Ground Station Alpha',
    location: 'İstanbul, Türkiye',
    type: 'Yer İstasyonu',
    description: 'Tam donanımlı uydu kontrol ve veri alım istasyonu',
    totalValue: 3000000,
    availableTokens: 1500000,
    pricePerToken: 3.00,
    projectedYield: 6.8,
    riskLevel: 'Düşük',
    status: 'Aktif',
    images: ['/assets/ground-station.jpg'],
    launchDate: '2024-09-01',
    investors: 62
  },
  {
    id: 4,
    name: 'Deep Space Research',
    location: 'Derin Uzay',
    type: 'Ar-Ge Projesi',
    description: 'Mars keşif ve asteroid madenciliği araştırma projesi',
    totalValue: 8000000,
    availableTokens: 4000000,
    pricePerToken: 8.00,
    projectedYield: 7.5,
    riskLevel: 'Çok Yüksek',
    status: 'Yakında',
    images: ['/assets/deep-space.jpg'],
    launchDate: '2025-06-15',
    investors: 15
  }
];

const ASSET_TYPES = [
  'Tüm Varlıklar',
  'CubeSat',
  'NanoSat',
  'Yer İstasyonu',
  'Ar-Ge Projesi'
];

const STATUS_TYPES = [
  'Tüm Durumlar',
  'Aktif',
  'Yakında',
  'Satıldı'
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tüm Varlıklar');
  const [selectedStatus, setSelectedStatus] = useState('Tüm Durumlar');

  const filteredAssets = MOCK_ASSETS.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Tüm Varlıklar' || asset.type === selectedType;
    const matchesStatus = selectedStatus === 'Tüm Durumlar' || asset.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Uydu Pazarı</h1>
            <p className="text-xl text-muted-foreground">
              Tokenize edilmiş uzay varlıklarını keşfedin ve yatırım yapmaya başlayın
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Toplam Değer</p>
                    <p className="text-2xl font-bold">{formatCurrency('18500000')}</p>
                  </div>
                  <Coins className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Aktif Uydular</p>
                    <p className="text-2xl font-bold">4</p>
                  </div>
                  <Satellite className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Yatırımcılar</p>
                    <p className="text-2xl font-bold">150</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Yaklaşan Fırlatmalar</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Uydu ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="pl-10 pr-8 py-2 rounded-md border border-input bg-background"
                >
                  {ASSET_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 rounded-md border border-input bg-background"
                >
                  {STATUS_TYPES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Asset Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map(asset => (
              <Card key={asset.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={asset.images[0]}
                    alt={asset.name}
                    className="object-cover w-full h-full"
                  />
                  <Badge 
                    className="absolute top-4 right-4"
                    variant={asset.status === 'Aktif' ? 'default' : 'secondary'}
                  >
                    {asset.status}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{asset.name}</CardTitle>
                      <CardDescription>{asset.location}</CardDescription>
                    </div>
                    <Badge variant="outline">{asset.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {asset.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Token Fiyatı</p>
                      <p className="font-semibold">{formatCurrency(asset.pricePerToken.toString())}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Beklenen Getiri</p>
                      <p className="font-semibold">%{asset.projectedYield}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Seviyesi</p>
                      <p className="font-semibold">{asset.riskLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Yatırımcılar</p>
                      <p className="font-semibold">{asset.investors}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Fırlatma: {asset.launchDate}
                      </span>
                    </div>
                    <Button>
                      Detaylar
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 