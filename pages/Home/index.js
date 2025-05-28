import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
    const [form, setForm] = useState({ keterangan: '', nominal: '', tipe: 'pemasukan' });
    const [data, setData] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('daily-money');
        if (stored) setData(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem('daily-money', JSON.stringify(data));
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.keterangan || !form.nominal) return alert('Lengkapi semua kolom');

        const newItem = {
            ...form,
            nominal: parseFloat(form.nominal),
            tanggal: new Date().toISOString().split('T')[0],
        };

        setData([newItem, ...data]);
        setForm({ keterangan: '', nominal: '', tipe: 'pemasukan' });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-primary">💰 Money Daily</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="card bg-base-100 shadow-md p-4 space-y-3">
                <input
                    type="text"
                    placeholder="Keterangan"
                    value={form.keterangan}
                    onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
                    className="input input-bordered w-full"
                />
                <input
                    type="number"
                    placeholder="Nominal"
                    value={form.nominal}
                    onChange={(e) => setForm({ ...form, nominal: e.target.value })}
                    className="input input-bordered w-full"
                />
                <select
                    value={form.tipe}
                    onChange={(e) => setForm({ ...form, tipe: e.target.value })}
                    className="select select-bordered w-full"
                >
                    <option value="pemasukan">Pemasukan</option>
                    <option value="pengeluaran">Pengeluaran</option>
                </select>
                <button type="submit" className="btn btn-primary w-full">
                    Simpan
                </button>
            </form>

            {/* Tabel Riwayat */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">📆 Riwayat Hari Ini</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Keterangan</th>
                                <th>Nominal</th>
                                <th>Tipe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, i) => (
                                <tr
                                    key={i}
                                    className={item.tipe === 'pengeluaran' ? 'bg-red-100' : 'bg-green-100'}
                                >
                                    <td>{item.tanggal}</td>
                                    <td>{item.keterangan}</td>
                                    <td>Rp {item.nominal.toLocaleString('id-ID')}</td>
                                    <td className="capitalize">{item.tipe}</td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center text-gray-400 py-4">
                                        Belum ada data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Link */}
            <div className="mt-6 text-center">
                <Link href="/home/laporan" className="link link-primary text-lg">
                    ➜ Lihat Laporan PDF
                </Link>
            </div>
        </div>
    );
}
