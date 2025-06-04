'use client';

import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket, 
  Satellite,
  Globe,
  Database,
  ArrowRight,
  Users,
  Coins,
  Calendar,
  Shield,
  AlertCircle
} from 'lucide-react';
import { formatCurrency } from '@/lib/stellar';
import Link from 'next/link';

const FEATURED_ASSETS = [
  {
    id: 1,
    name: 'Stellar-1 CubeSat',
    type: 'CubeSat',
    description: '6U CubeSat, uzaktan algılama ve görüntüleme yetenekleri',
    totalValue: 2500000,
    availableTokens: 750000,
    pricePerToken: 2.50,
    projectedYield: 8.5,
    riskLevel: 'Orta',
    status: 'Aktif',
    image: '/assets/satellite1.jpg',
    launchDate: '2024-12-15'
  },
  {
    id: 2,
    name: 'Orbital-1 NanoSat',
    type: 'NanoSat',
    description: 'İletişim odaklı nano uydu sistemi',
    totalValue: 5000000,
    availableTokens: 2000000,
    pricePerToken: 5.00,
    projectedYield: 9.2,
    riskLevel: 'Yüksek',
    status: 'Yakında',
    image: '/assets/satellite2.jpg',
    launchDate: '2025-03-01'
  }
];

const STATS = [
  {
    title: 'Toplam Değer',
    value: formatCurrency('18500000'),
    icon: Coins,
    description: 'Tokenize edilmiş uzay varlıkları'
  },
  {
    title: 'Aktif Uydular',
    value: '4',
    icon: Satellite,
    description: 'Operasyonel uydu sistemleri'
  },
  {
    title: 'Yatırımcılar',
    value: '150',
    icon: Users,
    description: 'Doğrulanmış katılımcılar'
  },
  {
    title: 'Yaklaşan Fırlatmalar',
    value: '2',
    icon: Rocket,
    description: 'Planlanan uzay görevleri'
  }
];

const FEATURES = [
  {
    title: 'Uydu Tokenizasyonu',
    description: 'Uydu ve uzay projelerinizi tokenize edin, yatırımcılarla buluşturun',
    icon: Satellite
  },
  {
    title: 'Uzay Veri Servisleri',
    description: 'Uzaktan algılama, iletişim ve veri aktarım hizmetleri',
    icon: Database
  },
  {
    title: 'Yer İstasyonları',
    description: 'Uydu kontrol ve veri alım istasyonları',
    icon: Globe
  },
  {
    title: 'Ar-Ge Projeleri',
    description: 'Derin uzay araştırma ve keşif projeleri',
    icon: Rocket
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-5xl font-bold tracking-tight">
                SpaceToken Orbital Exchange
              </h1>
              <p className="text-xl text-muted-foreground">
                Uzay Teknolojileri ve Uydu Sistemleri Tokenizasyon Platformu
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/marketplace">
                    Uyduları Keşfet
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/tokenize">
                    Uydu Tokenize Et
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                        </div>
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Platform Özellikleri</h2>
              <p className="text-xl text-muted-foreground">
                Uzay teknolojileri ve uydu sistemleri için özel çözümler
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-4" />
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Assets Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Öne Çıkan Uydular</h2>
              <p className="text-xl text-muted-foreground">
                En son tokenize edilen uzay varlıkları
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FEATURED_ASSETS.map(asset => (
                <Card key={asset.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={asset.image}
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
                        <CardDescription>{asset.type}</CardDescription>
                      </div>
                      <Badge variant="outline">{asset.riskLevel} Risk</Badge>
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
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Fırlatma: {asset.launchDate}
                        </span>
                      </div>
                      <Button asChild>
                        <Link href={`/marketplace/${asset.id}`}>
                          Detaylar
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-12">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                  <h2 className="text-3xl font-bold">
                    Uzay Teknolojilerinin Geleceğine Yatırım Yapın
                  </h2>
                  <p className="text-xl opacity-90">
                    Uydu ve uzay projelerinizi tokenize edin, yatırımcılarla buluşturun
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="secondary" size="lg">
                      <Link href="/marketplace">
                        Uyduları Keşfet
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="bg-transparent">
                      <Link href="/tokenize">
                        Uydu Tokenize Et
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
