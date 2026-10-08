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

interface Kamar {
    id: number;
    nomor: string;
    tipe: string;
    harga: number;
    harga_rp: string;
    status: ToneLabel;
    penghuni: string;
    gambar?: string;
}

export default function KosKamar({ kamars }: { kamars: Record<string, any>[] }) {
    const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
    const [rows, setRows] = useState<Kamar[]>(() =>
        kamars.map((k) => ({
            id: Number(k.id),
            nomor: String(k.nomor),
            tipe: String(k.tipe),
            harga: Number(k.harga),
            harga_rp: String(k.harga_rp),
            status: k.status as ToneLabel,
            penghuni: String(k.penghuni),
            gambar: k.gambar ? String(k.gambar) : undefined,
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Kamar | null>(null);
    const [form, setForm] = useState({ nomor: '', tipe: 'Standar', harga: '' });

    const openAdd = () => {
        setEditing(null);
        setForm({ nomor: '', tipe: 'Standar', harga: '' });
        setOpen(true);
    };

    const openEdit = (row: Kamar) => {
        setEditing(row);
        setForm({ nomor: row.nomor, tipe: row.tipe, harga: String(row.harga) });
        setOpen(true);
    };

    const save = () => {
        const harga = Number(form.harga) || 0;
        if (editing) {
            setRows((prev) =>
                prev.map((r) =>
                    r.id === editing.id ? { ...r, tipe: form.tipe, harga, harga_rp: rp(harga) } : r,
                ),
            );
            toast.success(`Kamar ${editing.nomor} diperbarui.`);
        } else {
            const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
            setRows((prev) => [
                ...prev,
                {
                    id,
                    nomor: form.nomor,
                    tipe: form.tipe,
                    harga,
                    harga_rp: rp(harga),
                    status: { label: 'Kosong', tone: 'success' as const },
                    penghuni: '-',
                },
            ]);
            toast.success(`Kamar ${form.nomor} ditambahkan.`);
        }
        setOpen(false);
    };

    const set = (key: 'nomor' | 'harga') => (e: { target: { value: string } }) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const columns: Column<Kamar>[] = [
        {
            key: 'gambar',
            header: '',
            render: (r) =>
                r.gambar ? (
                    <img
                        src={r.gambar}
                        alt={`Kamar ${r.nomor}`}
                        className="h-10 w-14 rounded-md object-cover"
                        loading="lazy"
                    />
                ) : (
                    <span className="text-muted-foreground text-xs">-</span>
                ),
        },
        { key: 'nomor', header: 'Nomor', sortValue: (r) => r.nomor },
        { key: 'tipe', header: 'Tipe', sortValue: (r) => r.tipe },
        {
            key: 'harga_rp',
            header: 'Harga / Bulan',
            render: (r) => <span className="tnum font-medium">{r.harga_rp}</span>,
            sortValue: (r) => r.harga,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
        { key: 'penghuni', header: 'Penghuni', mobileHidden: true, sortValue: (r) => r.penghuni },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Terisi', label: 'Terisi' },
                { value: 'Kosong', label: 'Kosong' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
        {
            key: 'tipe',
            label: 'Tipe',
            options: [
                { value: 'Standard', label: 'Standard' },
                { value: 'Deluxe', label: 'Deluxe' },
                { value: 'Eksklusif', label: 'Eksklusif' },
            ],
            match: (row: any, value: string) => row.tipe === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Kamar"
                description="Daftar semua kamar kos beserta harga dan status hunian."
                breadcrumbs={[{ label: 'Kos-Kosan', href: '/kos' }, { label: 'Kamar' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Kamar
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Kamar</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nomor', 'penghuni']}
                        filters={filters}
                        pageSize={15}
                        onEdit={openEdit}
                        emptyTitle="Belum ada kamar"
                        emptyDescription="Daftarkan kamar pertama, isi nomor, tipe, dan harga sewanya lewat tombol Tambah Kamar di atas."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Kamar' : 'Tambah Kamar'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="nomor">Nomor kamar</Label>
                            <Input id="nomor" value={form.nomor} onChange={set('nomor')} placeholder="cth: A-01" disabled={editing !== null} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Tipe kamar</Label>
                                <Select value={form.tipe} onValueChange={(v) => setForm((f) => ({ ...f, tipe: v }))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {['Standar', 'Deluxe', 'Eksklusif'].map((t) => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="harga">Harga/bulan (Rp)</Label>
                                <Input id="harga" type="number" min={0} value={form.harga} onChange={set('harga')} placeholder="1200000" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpen(false)}>Batal</Button>
                        <Button onClick={save} disabled={(!editing && !form.nomor.trim()) || !(Number(form.harga) > 0)}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
