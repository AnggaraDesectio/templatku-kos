import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column } from '@/components/data-table';
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
import { useState } from 'react';
import { toast } from 'sonner';

interface Penghuni {
    id: number;
    nama: string;
    kamar: string;
    telepon: string;
    tgl_masuk: string;
}

export default function KosPenghuni({ penghunis }: { penghunis: Record<string, any>[] }) {
    const [rows, setRows] = useState<Penghuni[]>(() =>
        penghunis.map((p) => ({
            id: Number(p.id),
            nama: String(p.nama),
            kamar: String(p.kamar),
            telepon: String(p.telepon),
            tgl_masuk: String(p.tgl_masuk),
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Penghuni | null>(null);
    const [form, setForm] = useState({ nama: '', kamar: '', telepon: '' });

    const openAdd = () => {
        setEditing(null);
        setForm({ nama: '', kamar: '', telepon: '' });
        setOpen(true);
    };

    const openEdit = (row: Penghuni) => {
        setEditing(row);
        setForm({ nama: row.nama, kamar: row.kamar, telepon: row.telepon });
        setOpen(true);
    };

    const save = () => {
        if (editing) {
            setRows((prev) => prev.map((r) => (r.id === editing.id ? { ...r, ...form } : r)));
            toast.success(`Data ${form.nama} diperbarui.`);
        } else {
            const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
            setRows((prev) => [
                ...prev,
                {
                    id,
                    ...form,
                    tgl_masuk: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                },
            ]);
            toast.success(`${form.nama} tercatat sebagai penghuni kamar ${form.kamar}.`);
        }
        setOpen(false);
    };

    const set = (key: 'nama' | 'kamar' | 'telepon') => (e: { target: { value: string } }) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const columns: Column<Penghuni>[] = [
        { key: 'nama', header: 'Nama', sortValue: (r) => r.nama },
        { key: 'kamar', header: 'Kamar', sortValue: (r) => r.kamar },
        { key: 'telepon', header: 'Telepon', mobileHidden: true },
        { key: 'tgl_masuk', header: 'Tanggal Masuk', sortValue: (r) => r.tgl_masuk },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Penghuni"
                description="Daftar penghuni aktif beserta kamar dan tanggal masuk."
                breadcrumbs={[{ label: 'Kos-Kosan', href: '/kos' }, { label: 'Penghuni' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Penghuni
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Penghuni</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'kamar']}
                        pageSize={15}
                        onEdit={openEdit}
                        emptyTitle="Belum ada penghuni"
                        emptyDescription="Catat penghuni pertama, isi nama dan nomor kamarnya lewat tombol Tambah Penghuni di atas."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Penghuni' : 'Tambah Penghuni'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="nama">Nama penghuni</Label>
                            <Input id="nama" value={form.nama} onChange={set('nama')} placeholder="cth: Rizky Pratama" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="kamar">Nomor kamar</Label>
                                <Input id="kamar" value={form.kamar} onChange={set('kamar')} placeholder="cth: A-01" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="telepon">Telepon</Label>
                                <Input id="telepon" value={form.telepon} onChange={set('telepon')} placeholder="08xx-xxxx-xxxx" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpen(false)}>Batal</Button>
                        <Button onClick={save} disabled={!form.nama.trim() || !form.kamar.trim()}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
