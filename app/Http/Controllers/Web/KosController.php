<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\KosData;
use Inertia\Inertia;
use Inertia\Response;

/** Halaman-halaman kos-kosan KOSTIN (Inertia). */
class KosController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('kos/index', [
            'ringkasan' => KosData::ringkasan(),
            'okupansi'  => KosData::okupansiChart(),
            'tagihan'   => KosData::tagihanTerbaru(),
        ]);
    }

    public function kamar(): Response
    {
        return Inertia::render('kos/kamar', [
            'kamars' => KosData::kamars(),
        ]);
    }

    public function penghuni(): Response
    {
        return Inertia::render('kos/penghuni', [
            'penghunis' => KosData::penghunis(),
        ]);
    }

    public function tagihan(): Response
    {
        return Inertia::render('kos/tagihan', [
            'tagihans' => KosData::tagihans(),
        ]);
    }

    public function pengingat(): Response
    {
        return Inertia::render('kos/pengingat', [
            'pengingats' => KosData::pengingatTunggakan(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('kos/laporan', [
            'ringkasan'  => KosData::ringkasan(),
            'pendapatan' => KosData::pendapatanPerBulan(),
            'okupansi'   => KosData::okupansiChart(),
            'distribusi' => KosData::distribusiStatusKamar(),
        ]);
    }
}
