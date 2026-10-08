<?php

use App\Http\Controllers\Web\KosController;
use Illuminate\Support\Facades\Route;

Route::prefix('kos')->name('kos.')->group(function () {
    Route::get('/', [KosController::class, 'index'])->name('index');
    Route::get('/kamar', [KosController::class, 'kamar'])->name('kamar');
    Route::get('/penghuni', [KosController::class, 'penghuni'])->name('penghuni');
    Route::get('/tagihan', [KosController::class, 'tagihan'])->name('tagihan');
    Route::get('/pengingat', [KosController::class, 'pengingat'])->name('pengingat');
    Route::get('/laporan', [KosController::class, 'laporan'])->name('laporan');
});
