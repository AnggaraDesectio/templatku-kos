import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

interface Tagihan {
    id: number;
    penghuni: string;
    kamar: string;
    bulan: string;
    jumlah: number;
    jumlah_rp: string;
    status: ToneLabel;
    jatuh_tempo: string;
    dibayar: string;
    hari_tunggakan: number;
}

export default function KosTagihan({ tagihans }: { tagihans: Record<string, any>[] }) {
    const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
    const [rows, setRows] = useState<Tagihan[]>(() =>
        tagihans.map((t) => ({
            id: Number(t.id),
            penghuni: String(t.penghuni),
            kamar: String(t.kamar),
            bulan: String(t.bulan),
            jumlah: Number(t.jumlah),
            jumlah_rp: String(t.jumlah_rp),
            status: t.status as ToneLabel,
            jatuh_tempo: String(t.jatuh_tempo),
            dibayar: String(t.dibayar),
            hari_tunggakan: Number(t.hari_tunggakan),
        })),
    );
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ penghuni: '', kamar: '', bulan: 'Oktober 2026', jumlah: '' });

    const save = () => {
        const jumlah = Number(form.jumlah) || 0;
        const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
        setRows((prev) => [
            {
                id,
                penghuni: form.penghuni,
                kamar: form.kamar,
                bulan: form.bulan,
                jumlah,
                jumlah_rp: rp(jumlah),
                status: { label: 'Belum Bayar', tone: 'warning' as const },
                jatuh_tempo: `10 ${form.bulan}`,
                dibayar: '-',
                hari_tunggakan: 0,
            },
            ...prev,
        ]);
        toast.success(`Tagihan ${form.bulan} untuk ${form.penghuni} dibuat.`);
        setForm({ penghuni: '', kamar: '', bulan: 'Oktober 2026', jumlah: '' });
        setOpen(false);
    };

    const tandaiLunas = (row: Tagihan) => {
        setRows((prev) =>
            prev.map((r) =>
                r.id === row.id
                    ? {
                          ...r,
                          status: { label: 'Lunas', tone: 'success' as const },
                          dibayar: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                          hari_tunggakan: 0,
                      }
                    : r,
            ),
        );
        toast.success(`Tagihan ${row.penghuni} bulan ${row.bulan} lunas.`);
    };

    const set = (key: 'penghuni' | 'kamar' | 'bulan' | 'jumlah') => (e: { target: { value: string } }) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const columns: Column<Tagihan>[] = [
        { key: 'penghuni', header: 'Penghuni', sortValue: (r) => r.penghuni },
        { key: 'kamar', header: 'Kamar', sortValue: (r) => r.kamar },
        { key: 'bulan', header: 'Bulan', mobileHidden: true },
        {
            key: 'jumlah_rp',
            header: 'Jumlah',
            render: (r) => <span className="tnum font-medium">{r.jumlah_rp}</span>,
            sortValue: (r) => r.jumlah,
        },
        {
            key: 'hari_tunggakan',
            header: 'Menunggak',
            render: (r) =>
                r.hari_tunggakan > 0 ? (
                    <span className="tnum">{r.hari_tunggakan} hari</span>
                ) : (
                    <span className="text-muted-foreground">-</span>
                ),
            sortValue: (r) => r.hari_tunggakan,
        },
        { key: 'dibayar', header: 'Dibayar', mobileHidden: true },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Lunas', label: 'Lunas' },
                { value: 'Belum Bayar', label: 'Belum Bayar' },
                { value: 'Menunggak', label: 'Menunggak' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
        {
            key: 'bulan',
            label: 'Bulan',
            options: [
                { value: 'Oktober 2026', label: 'Oktober 2026' },
                { value: 'September 2026', label: 'September 2026' },
            ],
            match: (row: any, value: string) => row.bulan === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Tagihan"
                description="Tagihan bulanan tiap penghuni beserta status pembayaran."
                breadcrumbs={[{ label: 'Kos-Kosan', href: '/kos' }, { label: 'Tagihan' }]}
                actions={
                    <Button size="sm" onClick={() => setOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Buat Tagihan
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Tagihan</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['penghuni', 'kamar']}
                        filters={filters}
                        pageSize={15}
                        extraRowActions={(row) =>
                            row.status.label !== 'Lunas' ? (
                                <Button variant="ghost" size="sm" onClick={() => tandaiLunas(row)}>
                                    Tandai Lunas
                                </Button>
                            ) : null
                        }
                        emptyTitle="Belum ada tagihan"
                        emptyDescription="Buat tagihan bulanan pertama, isi penghuni, kamar, dan nominalnya lewat tombol Buat Tagihan di atas."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Buat Tagihan</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="penghuni">Penghuni</Label>
                                <Input id="penghuni" value={form.penghuni} onChange={set('penghuni')} placeholder="cth: Rizky Pratama" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="kamar">Kamar</Label>
                                <Input id="kamar" value={form.kamar} onChange={set('kamar')} placeholder="cth: A-01" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="bulan">Bulan tagihan</Label>
                                <Input id="bulan" value={form.bulan} onChange={set('bulan')} placeholder="Oktober 2026" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="jumlah">Jumlah (Rp)</Label>
                                <Input id="jumlah" type="number" min={0} value={form.jumlah} onChange={set('jumlah')} placeholder="1200000" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpen(false)}>Batal</Button>
                        <Button onClick={save} disabled={!form.penghuni.trim() || !(Number(form.jumlah) > 0)}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
