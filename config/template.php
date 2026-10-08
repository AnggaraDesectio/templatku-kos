<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "kos".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'kos'),

    'flavors' => array (
  'kos' => 
  array (
    'label' => 'Kos-Kosan',
    'brand_name' => 'KOSTIN',
    'brand_tagline' => 'Kelola kos mudah',
    'brand_initials' => 'KO',
    'accent' => '#c2410c',
    'category' => 'properti',
    'home' => 'kos.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Kos',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/kos',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Kamar',
              'to' => '/kos/kamar',
              'icon' => 'BedDouble',
            ),
            2 => 
            array (
              'label' => 'Penghuni',
              'to' => '/kos/penghuni',
              'icon' => 'Users',
            ),
            3 => 
            array (
              'label' => 'Tagihan',
              'to' => '/kos/tagihan',
              'icon' => 'Receipt',
            ),
            4 => 
            array (
              'label' => 'Pengingat Bayar',
              'to' => '/kos/pengingat',
              'icon' => 'Bell',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/kos/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
