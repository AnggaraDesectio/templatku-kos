import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCheck, Copy } from 'lucide-react';
import { EmptyState } from '@/components/empty-state';
import { toast } from 'sonner';
import { useState } from 'react';
import { PartyPopper } from 'lucide-react';

interface Pengingat {
    id: number;
    penghuni: string;
    kamar: string;
    bulan: string;
    jumlah_rp: string;
    hari_tunggakan: number;
    status: ToneLabel;
    jatuh_tempo: string;
    pesan_wa: string;
}

export default function KosPengingat({ pengingats }: { pengingats: Record<string, any>[] }) {
    const [rows, setRows] = useState<Pengingat[]>(() =>
        pengingats.map((p) => ({
            id: Number(p.id),
            penghuni: String(p.penghuni),
            kamar: String(p.kamar),
            bulan: String(p.bulan),
            jumlah_rp: String(p.jumlah_rp),
            hari_tunggakan: Number(p.hari_tunggakan),
            status: p.status as ToneLabel,
            jatuh_tempo: String(p.jatuh_tempo),
            pesan_wa: String(p.pesan_wa),
        })),
    );

    const tandaiBayar = (r: Pengingat) => {
        setRows((prev) => prev.filter((x) => x.id !== r.id));
        toast.success(`${r.penghuni} (kamar ${r.kamar}) ditandai sudah bayar.`);
    };

    const salinPesan = (pesan: string) => {
        navigator.clipboard
            .writeText(pesan)
            .then(() => toast.success('Pesan WA disalin ke clipboard.'))
            .catch(() => toast.error('Gagal menyalin pesan.'));
    };

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Pengingat Bayar"
                description="Penghuni dengan tagihan belum lunas, lengkap dengan template pesan WhatsApp."
                breadcrumbs={[{ label: 'Kos-Kosan', href: '/kos' }, { label: 'Pengingat Bayar' }]}
            />
            {rows.length === 0 ? (
                <EmptyState
                    icon={<PartyPopper className="h-8 w-8" />}
                    title="Semua tagihan sudah lunas"
                    description="Tidak ada penghuni yang menunggak. Pesan pengingat baru akan muncul di sini saat ada tagihan lewat jatuh tempo."
                />
            ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {rows.map((r) => (
                    <Card key={r.id} className="shadow-sm">
                        <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
                            <div>
                                <CardTitle className="text-base">{r.penghuni}</CardTitle>
                                <p className="text-muted-foreground mt-1 text-sm">
                                    Kamar {r.kamar} · {r.bulan} ·{' '}
                                    <span className="tnum font-medium">{r.jumlah_rp}</span>
                                </p>
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-1.5">
                                <ToneBadge label={r.status.label} tone={r.status.tone} />
                                <Badge variant="outline" className="tnum">
                                    <Bell className="mr-1 h-3 w-3" />
                                    {r.hari_tunggakan} hari
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="bg-muted/60 rounded-lg p-3 text-sm leading-relaxed">
                                {r.pesan_wa}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Button size="sm" onClick={() => salinPesan(r.pesan_wa)}>
                                    <Copy className="mr-2 h-4 w-4" /> Salin Pesan
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => tandaiBayar(r)}
                                >
                                    <CheckCheck className="mr-2 h-4 w-4" /> Tandai Sudah Bayar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            )}
        </AuthenticatedLayout>
    );
}
