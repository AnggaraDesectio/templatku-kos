<?php

namespace App\Support\Demo;

/**
 * Data demo kos-kosan (KOSTIN): kamar, penghuni, tagihan, pengingat, laporan.
 * Semua angka ditulis eksplisit supaya total konsisten antar halaman.
 * Kontrak status: ['label' => .., 'tone' => ..] tanpa HTML,
 * tone ∈ success | warning | destructive | info.
 */
class KosData
{
    private static function rp(int $value): string
    {
        return 'Rp'.number_format($value, 0, ',', '.');
    }

    /** Baris mentah kamar (tanpa agregat), dipakai internal agar tidak rekursi. */
    private static function kamarRows(): array
    {
        return [
            ['id' => 1,  'nomor' => 'A1',  'tipe' => 'Standard',  'harga' => 850000,  'status' => 'terisi', 'gambar' => '/images/kos/kamar-1.jpg'],
            ['id' => 2,  'nomor' => 'A2',  'tipe' => 'Standard',  'harga' => 850000,  'status' => 'terisi', 'gambar' => '/images/kos/kamar-2.jpg'],
            ['id' => 3,  'nomor' => 'A3',  'tipe' => 'Standard',  'harga' => 850000,  'status' => 'kosong', 'gambar' => '/images/kos/kamar-1.jpg'],
            ['id' => 4,  'nomor' => 'A4',  'tipe' => 'Deluxe',    'harga' => 1250000, 'status' => 'terisi', 'gambar' => '/images/kos/kamar-3.jpg'],
            ['id' => 5,  'nomor' => 'A5',  'tipe' => 'Deluxe',    'harga' => 1250000, 'status' => 'terisi', 'gambar' => '/images/kos/kamar-4.jpg'],
            ['id' => 6,  'nomor' => 'A6',  'tipe' => 'Deluxe',    'harga' => 1250000, 'status' => 'kosong', 'gambar' => '/images/kos/kamar-3.jpg'],
            ['id' => 7,  'nomor' => 'A7',  'tipe' => 'Eksklusif', 'harga' => 1800000, 'status' => 'terisi', 'gambar' => '/images/kos/kamar-5.jpg'],
            ['id' => 8,  'nomor' => 'A8',  'tipe' => 'Eksklusif', 'harga' => 1800000, 'status' => 'terisi', 'gambar' => '/images/kos/kamar-6.jpg'],
            ['id' => 9,  'nomor' => 'A9',  'tipe' => 'Eksklusif', 'harga' => 1800000, 'status' => 'terisi', 'gambar' => '/images/kos/kamar-5.jpg'],
            ['id' => 10, 'nomor' => 'A10', 'tipe' => 'Eksklusif', 'harga' => 2000000, 'status' => 'kosong', 'gambar' => '/images/kos/kamar-6.jpg'],
            ['id' => 11, 'nomor' => 'B1',  'tipe' => 'Standard',  'harga' => 750000,  'status' => 'terisi', 'gambar' => '/images/kos/kamar-1.jpg'],
            ['id' => 12, 'nomor' => 'B2',  'tipe' => 'Standard',  'harga' => 750000,  'status' => 'terisi', 'gambar' => '/images/kos/kamar-2.jpg'],
            ['id' => 13, 'nomor' => 'B3',  'tipe' => 'Deluxe',    'harga' => 1100000, 'status' => 'terisi', 'gambar' => '/images/kos/kamar-4.jpg'],
            ['id' => 14, 'nomor' => 'B4',  'tipe' => 'Deluxe',    'harga' => 1100000, 'status' => 'kosong', 'gambar' => '/images/kos/kamar-3.jpg'],
            ['id' => 15, 'nomor' => 'B5',  'tipe' => 'Eksklusif', 'harga' => 1900000, 'status' => 'terisi', 'gambar' => '/images/kos/kamar-5.jpg'],
        ];
    }

    /** Baris mentah penghuni (tanpa agregat), dipakai internal agar tidak rekursi. */
    private static function penghuniRows(): array
    {
        return [
            ['id' => 1,  'nama' => 'Andi Pratama',  'kamar_id' => 1,  'telepon' => '0812-3456-7890', 'tgl_masuk' => '12 Jan 2026'],
            ['id' => 2,  'nama' => 'Siti Rahayu',   'kamar_id' => 2,  'telepon' => '0813-2345-6789', 'tgl_masuk' => '03 Feb 2026'],
            ['id' => 3,  'nama' => 'Budi Kurniawan','kamar_id' => 4,  'telepon' => '0812-9876-5432', 'tgl_masuk' => '20 Jan 2026'],
            ['id' => 4,  'nama' => 'Dewi Anggraini','kamar_id' => 5,  'telepon' => '0815-6789-0123', 'tgl_masuk' => '01 Mar 2026'],
            ['id' => 5,  'nama' => 'Fajar Ramadhan','kamar_id' => 7,  'telepon' => '0816-5432-1098', 'tgl_masuk' => '15 Feb 2026'],
            ['id' => 6,  'nama' => 'Rina Marlina',  'kamar_id' => 8,  'telepon' => '0817-1234-5678', 'tgl_masuk' => '10 Apr 2026'],
            ['id' => 7,  'nama' => 'Dimas Saputra', 'kamar_id' => 9,  'telepon' => '0818-8765-4321', 'tgl_masuk' => '25 Mar 2026'],
            ['id' => 8,  'nama' => 'Lina Wulandari','kamar_id' => 11, 'telepon' => '0819-3456-1234', 'tgl_masuk' => '05 Mei 2026'],
            ['id' => 9,  'nama' => 'Hendra Setiawan','kamar_id' => 12,'telepon' => '0821-2345-9876', 'tgl_masuk' => '18 Jun 2026'],
            ['id' => 10, 'nama' => 'Maya Kusuma',   'kamar_id' => 13, 'telepon' => '0822-5678-1234', 'tgl_masuk' => '02 Jul 2026'],
            ['id' => 11, 'nama' => 'Rudi Hermawan', 'kamar_id' => 15, 'telepon' => '0823-7890-4567', 'tgl_masuk' => '11 Agu 2026'],
        ];
    }

    /** Baris mentah tagihan (tanpa agregat), dipakai internal agar tidak rekursi. */
    private static function tagihanRows(): array
    {
        return [
            ['id' => 1,  'penghuni_id' => 1,  'bulan' => 'Oktober 2026', 'jumlah' => 850000,  'status' => 'lunas',   'jatuh_tempo' => '5 Okt 2026', 'dibayar' => '2 Okt 2026',  'hari_tunggakan' => 0],
            ['id' => 2,  'penghuni_id' => 2,  'bulan' => 'Oktober 2026', 'jumlah' => 850000,  'status' => 'lunas',   'jatuh_tempo' => '5 Okt 2026', 'dibayar' => '1 Okt 2026',  'hari_tunggakan' => 0],
            ['id' => 3,  'penghuni_id' => 3,  'bulan' => 'Oktober 2026', 'jumlah' => 1250000, 'status' => 'tunggak', 'jatuh_tempo' => '5 Okt 2026', 'dibayar' => '-',           'hari_tunggakan' => 3],
            ['id' => 4,  'penghuni_id' => 4,  'bulan' => 'Oktober 2026', 'jumlah' => 1250000, 'status' => 'lunas',   'jatuh_tempo' => '5 Okt 2026', 'dibayar' => '4 Okt 2026',  'hari_tunggakan' => 0],
            ['id' => 5,  'penghuni_id' => 5,  'bulan' => 'Oktober 2026', 'jumlah' => 1800000, 'status' => 'belum',   'jatuh_tempo' => '5 Okt 2026', 'dibayar' => '-',           'hari_tunggakan' => 3],
            ['id' => 6,  'penghuni_id' => 6,  'bulan' => 'Oktober 2026', 'jumlah' => 1800000, 'status' => 'lunas',   'jatuh_tempo' => '5 Okt 2026', 'dibayar' => '3 Okt 2026',  'hari_tunggakan' => 0],
            ['id' => 7,  'penghuni_id' => 7,  'bulan' => 'Oktober 2026', 'jumlah' => 1800000, 'status' => 'lunas',   'jatuh_tempo' => '5 Okt 2026', 'dibayar' => '5 Okt 2026',  'hari_tunggakan' => 0],
            ['id' => 8,  'penghuni_id' => 8,  'bulan' => 'Oktober 2026', 'jumlah' => 750000,  'status' => 'belum',   'jatuh_tempo' => '5 Okt 2026', 'dibayar' => '-',           'hari_tunggakan' => 3],
            ['id' => 9,  'penghuni_id' => 9,  'bulan' => 'Oktober 2026', 'jumlah' => 750000,  'status' => 'lunas',   'jatuh_tempo' => '5 Okt 2026', 'dibayar' => '6 Okt 2026',  'hari_tunggakan' => 0],
            ['id' => 10, 'penghuni_id' => 10, 'bulan' => 'Oktober 2026', 'jumlah' => 1100000, 'status' => 'lunas',   'jatuh_tempo' => '5 Okt 2026', 'dibayar' => '2 Okt 2026',  'hari_tunggakan' => 0],
            ['id' => 11, 'penghuni_id' => 11, 'bulan' => 'Oktober 2026', 'jumlah' => 1900000, 'status' => 'lunas',   'jatuh_tempo' => '5 Okt 2026', 'dibayar' => '7 Okt 2026',  'hari_tunggakan' => 0],
            ['id' => 12, 'penghuni_id' => 3,  'bulan' => 'September 2026','jumlah' => 1250000,'status' => 'tunggak', 'jatuh_tempo' => '5 Sep 2026', 'dibayar' => '-',           'hari_tunggakan' => 33],
            ['id' => 13, 'penghuni_id' => 5,  'bulan' => 'September 2026','jumlah' => 1800000,'status' => 'tunggak', 'jatuh_tempo' => '5 Sep 2026', 'dibayar' => '-',           'hari_tunggakan' => 33],
            ['id' => 14, 'penghuni_id' => 8,  'bulan' => 'September 2026','jumlah' => 750000, 'status' => 'lunas',   'jatuh_tempo' => '5 Sep 2026', 'dibayar' => '8 Sep 2026',  'hari_tunggakan' => 0],
        ];
    }

    private static function statusKamar(string $key): array
    {
        return $key === 'terisi'
            ? ['label' => 'Terisi', 'tone' => 'success']
            : ['label' => 'Kosong', 'tone' => 'info'];
    }

    private static function statusTagihan(string $key): array
    {
        return match ($key) {
            'lunas'   => ['label' => 'Lunas', 'tone' => 'success'],
            'belum'   => ['label' => 'Belum Bayar', 'tone' => 'warning'],
            'tunggak' => ['label' => 'Menunggak', 'tone' => 'destructive'],
            default   => ['label' => $key, 'tone' => 'info'],
        };
    }

    /** Daftar kamar lengkap dengan penghuni (jika terisi). */
    public static function kamars(): array
    {
        $penghuni = [];
        foreach (self::penghuniRows() as $p) {
            $penghuni[$p['kamar_id']] = $p['nama'];
        }

        return array_map(fn ($k) => [
            'id'         => $k['id'],
            'nomor'      => $k['nomor'],
            'tipe'       => $k['tipe'],
            'harga'      => $k['harga'],
            'harga_rp'   => self::rp($k['harga']),
            'status'     => self::statusKamar($k['status']),
            'penghuni'   => $penghuni[$k['id']] ?? '-',
            'gambar'     => $k['gambar'] ?? null,
        ], self::kamarRows());
    }

    /** Daftar penghuni lengkap dengan nomor kamar. */
    public static function penghunis(): array
    {
        $nomor = [];
        foreach (self::kamarRows() as $k) {
            $nomor[$k['id']] = $k['nomor'];
        }

        return array_map(fn ($p) => [
            'id'        => $p['id'],
            'nama'      => $p['nama'],
            'kamar'     => $nomor[$p['kamar_id']] ?? '-',
            'telepon'   => $p['telepon'],
            'tgl_masuk' => $p['tgl_masuk'],
        ], self::penghuniRows());
    }

    /** Daftar tagihan lengkap dengan nama penghuni + nomor kamar. */
    public static function tagihans(): array
    {
        $penghuni = [];
        $kamar    = [];
        foreach (self::penghuniRows() as $p) {
            $penghuni[$p['id']] = $p;
        }
        foreach (self::kamarRows() as $k) {
            $kamar[$k['id']] = $k['nomor'];
        }

        return array_map(function ($t) use ($penghuni, $kamar) {
            $p = $penghuni[$t['penghuni_id']];
            return [
                'id'             => $t['id'],
                'penghuni'       => $p['nama'],
                'kamar'          => $kamar[$p['kamar_id']] ?? '-',
                'bulan'          => $t['bulan'],
                'jumlah'         => $t['jumlah'],
                'jumlah_rp'      => self::rp($t['jumlah']),
                'status'         => self::statusTagihan($t['status']),
                'jatuh_tempo'    => $t['jatuh_tempo'],
                'dibayar'        => $t['dibayar'],
                'hari_tunggakan' => $t['hari_tunggakan'],
            ];
        }, self::tagihanRows());
    }

    /** Ringkasan angka untuk kartu statistik (dihitung dari data). */
    public static function ringkasan(): array
    {
        $kamars     = self::kamarRows();
        $terisi     = count(array_filter($kamars, fn ($k) => $k['status'] === 'terisi'));
        $total      = count($kamars);
        $okupansi   = $total > 0 ? (int) round($terisi / $total * 100) : 0;

        $rows       = self::tagihanRows();
        $okt        = array_filter($rows, fn ($t) => $t['bulan'] === 'Oktober 2026');
        $pendapatan = array_sum(array_map(
            fn ($t) => $t['status'] === 'lunas' ? $t['jumlah'] : 0, $okt
        ));
        $belumBayar = count(array_filter($rows, fn ($t) => $t['status'] !== 'lunas'));
        $tunggakan  = array_sum(array_map(
            fn ($t) => $t['status'] !== 'lunas' ? $t['jumlah'] : 0, $rows
        ));

        return [
            'total_kamar'         => $total,
            'terisi'              => $terisi,
            'kosong'              => $total - $terisi,
            'okupansi_persen'     => $okupansi,
            'tagihan_belum_bayar' => $belumBayar,
            'total_tunggakan'     => $tunggakan,
            'total_tunggakan_rp'  => self::rp($tunggakan),
            'pendapatan_bulan_ini'=> self::rp($pendapatan),
            'bulan'               => 'Oktober 2026',
        ];
    }

    /** Tren okupansi 6 bulan (%) untuk area chart. */
    public static function okupansiChart(): array
    {
        return [
            'labels'   => ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
            'datasets' => [['label' => 'Okupansi (%)', 'data' => [65, 68, 70, 71, 72, 73]]],
        ];
    }

    /** Pendapatan per bulan (juta Rp) untuk bar chart. */
    public static function pendapatanPerBulan(): array
    {
        return [
            'labels'   => ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
            'datasets' => [['label' => 'Pendapatan (juta Rp)', 'data' => [9.4, 9.8, 10.1, 10.6, 10.9, 10.3]]],
        ];
    }

    /** Distribusi status kamar untuk donut chart. */
    public static function distribusiStatusKamar(): array
    {
        $terisi = count(array_filter(self::kamarRows(), fn ($k) => $k['status'] === 'terisi'));

        return [
            'labels'   => ['Terisi', 'Kosong'],
            'datasets' => [['label' => 'Kamar', 'data' => [$terisi, count(self::kamarRows()) - $terisi]]],
        ];
    }

    /** 6 tagihan terbaru untuk dashboard. */
    public static function tagihanTerbaru(): array
    {
        return array_slice(self::tagihans(), 0, 6);
    }

    /** Pengingat untuk penghuni dengan tagihan belum lunas, terurut tunggakan terlama. */
    public static function pengingatTunggakan(): array
    {
        $rows = array_filter(self::tagihans(), fn ($t) => $t['status']['label'] !== 'Lunas');
        usort($rows, fn ($a, $b) => $b['hari_tunggakan'] <=> $a['hari_tunggakan']);

        return array_map(function ($t) {
            $t['pesan_wa'] = "Halo {$t['penghuni']}, pengingat tagihan kos KOSTIN kamar {$t['kamar']} bulan {$t['bulan']} sebesar {$t['jumlah_rp']} (jatuh tempo {$t['jatuh_tempo']}, menunggak {$t['hari_tunggakan']} hari). Mohon segera dibayarkan. Terima kasih.";

            return $t;
        }, array_values($rows));
    }
}
