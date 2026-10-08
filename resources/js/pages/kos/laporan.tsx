import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, BarChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Percent, Receipt, Wallet } from 'lucide-react';

interface Ringkasan {
    terisi: number;
    okupansi_persen: number;
    tagihan_belum_bayar: number;
    total_tunggakan_rp: string;
    pendapatan_bulan_ini: string;
    bulan: string;
}

export default function KosLaporan({
    ringkasan,
    pendapatan,
    okupansi,
    distribusi,
}: {
    ringkasan: Ringkasan;
    pendapatan: ChartData;
    okupansi: ChartData;
    distribusi: ChartData;
}) {
    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan"
                description="Pendapatan dan okupansi kos KOSTIN enam bulan terakhir."
                breadcrumbs={[{ label: 'Kos-Kosan', href: '/kos' }, { label: 'Laporan' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard
                    label={`Pendapatan ${ringkasan.bulan.split(' ')[0]}`}
                    hint="Uang sewa yang sudah lunas dibayar bulan ini."
                    value={ringkasan.pendapatan_bulan_ini}
                    delta="dari tagihan yang lunas"
                    trend="up"
                    icon={Wallet}
                />
                <StatCard
                    label="Okupansi"
                    hint="Porsi kamar yang sedang dihuni."
                    value={`${ringkasan.okupansi_persen}%`}
                    delta={`${ringkasan.terisi} kamar terisi`}
                    trend="up"
                    icon={Percent}
                />
                <StatCard
                    label="Belum Tertagih"
                    hint="Tagihan yang belum dibayar penghuni pada periode ini."
                    value={ringkasan.total_tunggakan_rp}
                    delta={`${ringkasan.tagihan_belum_bayar} tagihan belum lunas`}
                    trend="down"
                    icon={Receipt}
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Pendapatan per Bulan</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Pendapatan dari tagihan lunas dalam juta rupiah.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={pendapatan} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Status Kamar</CardTitle>
                        <p className="text-muted-foreground text-sm">Distribusi kamar saat ini.</p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={distribusi} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Tren Okupansi</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Persentase kamar terisi per bulan.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <AreaChartCard data={okupansi} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
