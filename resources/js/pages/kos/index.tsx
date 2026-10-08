import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BedDouble, Receipt, Users, Wallet } from 'lucide-react';

interface Tagihan {
    id: number;
    penghuni: string;
    kamar: string;
    bulan: string;
    jumlah_rp: string;
    status: ToneLabel;
}

interface Ringkasan {
    total_kamar: number;
    terisi: number;
    kosong: number;
    okupansi_persen: number;
    tagihan_belum_bayar: number;
    total_tunggakan_rp: string;
    pendapatan_bulan_ini: string;
    bulan: string;
}

export default function KosIndex({
    ringkasan,
    okupansi,
    tagihan,
}: {
    ringkasan: Ringkasan;
    okupansi: ChartData;
    tagihan: Record<string, any>[];
}) {
    const rows: Tagihan[] = tagihan.map((t) => ({
        id: Number(t.id),
        penghuni: String(t.penghuni),
        kamar: String(t.kamar),
        bulan: String(t.bulan),
        jumlah_rp: String(t.jumlah_rp),
        status: t.status as ToneLabel,
    }));

    const columns: Column<Tagihan>[] = [
        { key: 'penghuni', header: 'Penghuni', sortValue: (r) => r.penghuni },
        { key: 'kamar', header: 'Kamar', sortValue: (r) => r.kamar },
        { key: 'bulan', header: 'Bulan', mobileHidden: true },
        {
            key: 'jumlah_rp',
            header: 'Jumlah',
            render: (r) => <span className="tnum font-medium">{r.jumlah_rp}</span>,
            sortValue: (r) => r.jumlah_rp,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Kos-Kosan"
                description="Ringkasan kamar, penghuni, dan tagihan kos KOSTIN."
                breadcrumbs={[{ label: 'Kos-Kosan' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Total Kamar"
                    value={String(ringkasan.total_kamar)}
                    delta={`${ringkasan.terisi} terisi · ${ringkasan.kosong} kosong`}
                    trend="flat"
                    icon={BedDouble}
                    hint="Jumlah seluruh kamar kos yang dikelola."
                />
                <StatCard
                    label="Kamar Terisi"
                    value={String(ringkasan.terisi)}
                    delta={`${ringkasan.okupansi_persen}% okupansi`}
                    trend="up"
                    icon={Users}
                    hint="Kamar yang sedang dihuni, sumber pendapatan rutin."
                />
                <StatCard
                    label="Tagihan Belum Bayar"
                    value={String(ringkasan.tagihan_belum_bayar)}
                    delta={ringkasan.total_tunggakan_rp}
                    trend="down"
                    icon={Receipt}
                    hint="Tagihan yang belum dibayar penghuni, segera tagih."
                />
                <StatCard
                    label={`Pendapatan ${ringkasan.bulan.split(' ')[0]}`}
                    value={ringkasan.pendapatan_bulan_ini}
                    delta="dari tagihan yang lunas"
                    trend="up"
                    icon={Wallet}
                    hint="Uang sewa yang sudah lunas dibayar bulan ini."
                />
            </div>
            <div className="mt-4">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Okupansi Kamar</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Persentase kamar terisi dalam 6 bulan terakhir.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <AreaChartCard data={okupansi} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    searchKeys={['penghuni', 'kamar']}
                    emptyTitle="Belum ada tagihan"
                    emptyDescription="Tagihan bulanan dibuat di halaman Tagihan."
                />
            </div>
        </AuthenticatedLayout>
    );
}
