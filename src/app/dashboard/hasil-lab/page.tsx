'use client';
import { useState } from 'react';
import {
  FileText,
  Search,
  Download,
  Calendar,
  User,
  ShieldCheck,
  Eye,
  CheckCircle,
  AlertTriangle,
  Stethoscope,
  Info,
  Printer,
} from 'lucide-react';
import { usePatientRecordStore } from '@/lib/store/usePatientRecordStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import type { LabResultItem } from '@/types/patientRecord';
import Tabs from '@/components/ui/Tabs';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

const CATEGORY_TABS = [
  { id: 'all', label: 'Semua Hasil' },
  { id: 'Hematologi', label: 'Hematologi' },
  { id: 'Kimia Darah', label: 'Kimia Darah' },
  { id: 'Radiologi', label: 'Radiologi' },
];

export default function HasilLabPage() {
  const user = useAuthStore((s) => s.user);
  const { labResults, medicalRecord } = usePatientRecordStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<LabResultItem | null>(null);

  const filteredResults = labResults.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.testCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.parameters.some((p) => p.parameter.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Hasil Laboratorium & Diagnostik
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
              Akses riwayat tes darah, radiologi, dan patologi resmi yang divalidasi oleh dokter spesialis kami.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Rekam Medis Terenkripsi SSL 256-bit</span>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-teal-200/70 p-4 rounded-2xl flex items-start gap-3">
        <div className="p-2 rounded-xl bg-teal-600 text-white shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="text-xs text-teal-950 space-y-1">
          <p className="font-bold">Informasi Pelayanan Laboratorium Digital</p>
          <p className="text-teal-800 leading-relaxed">
            Hasil pemeriksaan rutin darah umumnya tersedia dalam 2-4 jam pasca pengambilan sampel. Dokumen yang diunduh melalui portal ini memiliki validasi tanda tangan digital RS Bahagia Medika dan dapat digunakan sebagai rujukan resmi ke faskes lain atau klaim asuransi.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <Tabs tabs={CATEGORY_TABS} activeTab={activeCategory} onChange={setActiveCategory} />

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari parameter atau dokter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
      </div>

      {/* Lab Results Grid */}
      {filteredResults.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-bold text-gray-700">Tidak ada hasil laboratorium ditemukan</h3>
          <p className="text-xs text-gray-500 mt-1">
            Coba sesuaikan kata kunci pencarian atau kategori filter di atas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResults.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-base text-[var(--color-text-primary)] mt-1.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-0.5">
                      {item.testCode}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      item.status === 'Normal'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status === 'Normal' ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    {item.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-[var(--color-text-secondary)] mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Tanggal: <strong>{item.testDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span>Dokter Pengirim: <strong>{item.doctorName}</strong> ({item.doctorSpecialization})</span>
                  </div>
                </div>

                {/* Snippet parameters */}
                <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100 mb-4">
                  <p className="text-[11px] font-bold text-gray-600 uppercase mb-2">
                    Hasil Utama:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {item.parameters.slice(0, 4).map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white px-2 py-1 rounded border border-gray-100">
                        <span className="text-gray-600 truncate max-w-[90px]">{p.parameter}:</span>
                        <span className="font-mono font-bold text-gray-900">{p.value} {p.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedResult(item)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors inline-flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Lihat Lembar Hasil
                </button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Mengunduh berkas PDF: ${item.pdfDownloadName}`)}
                  className="inline-flex items-center gap-1.5 text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh PDF</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Official Certificate Detail Modal */}
      {selectedResult && (
        <Modal
          isOpen={!!selectedResult}
          onClose={() => setSelectedResult(null)}
          title="Lembar Hasil Pemeriksaan Laboratorium"
          size="lg"
        >
          <div className="space-y-4 py-1 text-xs">
            {/* Hospital Official Header */}
            <div className="p-4 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center justify-between border-b pb-3 mb-3 border-gray-200">
                <div>
                  <h4 className="font-black text-sm text-[var(--color-primary)] uppercase tracking-wider">
                    RS BAHAGIA MEDIKA JAKARTA
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    Instalasi Laboratorium Patologi Klinik & Radiologi Terpadu 24 Jam
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Jl. Bahagia Sehat No. 88, Jakarta Selatan &bull; Telp: (021) 7890-1234
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {selectedResult.testCode}
                  </span>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1">STATUS: TERVERIFIKASI</p>
                </div>
              </div>

              {/* Patient Meta Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-teal-50/40 p-3 rounded-lg text-[11px]">
                <div>
                  <span className="text-gray-500 block">Nama Pasien:</span>
                  <span className="font-bold text-gray-800">{user?.name || 'Kevin Santoso'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">No. Rekam Medis:</span>
                  <span className="font-mono font-bold text-[var(--color-primary)]">{medicalRecord.rmNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Tanggal Pemeriksaan:</span>
                  <span className="font-bold text-gray-800">{selectedResult.testDate}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Dokter Penanggung Jawab:</span>
                  <span className="font-bold text-gray-800 truncate block">{selectedResult.doctorName}</span>
                </div>
              </div>
            </div>

            {/* Test Table */}
            <div>
              <h5 className="font-bold text-xs uppercase text-gray-700 mb-2">
                Daftar Analisis Biomarker: {selectedResult.title}
              </h5>
              <div className="border border-gray-200 rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <thead className="bg-gray-100/80 border-b border-gray-200 font-bold text-gray-700">
                    <tr>
                      <th className="p-2.5">Parameter Uji</th>
                      <th className="p-2.5">Hasil Pengukuran</th>
                      <th className="p-2.5">Satuan</th>
                      <th className="p-2.5">Rentang Rujukan</th>
                      <th className="p-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {selectedResult.parameters.map((param, i) => (
                      <tr key={i} className="hover:bg-teal-50/20">
                        <td className="p-2.5 font-semibold text-gray-800">{param.parameter}</td>
                        <td className="p-2.5 font-mono font-bold text-gray-900">{param.value}</td>
                        <td className="p-2.5 text-gray-500">{param.unit || '-'}</td>
                        <td className="p-2.5 text-gray-600">{param.normalRange}</td>
                        <td className="p-2.5 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              param.status === 'Normal'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {param.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Clinical Conclusion */}
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
              <p className="font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                Interpretasi & Evaluasi Medis:
              </p>
              <p className="text-gray-700 leading-relaxed">{selectedResult.conclusion}</p>
              {selectedResult.recommendations && (
                <p className="text-gray-600 pt-1 text-[11px]">
                  <strong>Saran Klinis:</strong> {selectedResult.recommendations}
                </p>
              )}
            </div>

            {/* Validation signatures */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-[11px] text-gray-500">
              <div>
                <p>Laboran / Analis Medis:</p>
                <p className="font-bold text-gray-700">{selectedResult.analystName}</p>
              </div>
              <div className="text-right">
                <p>Dokter Spesialis Patologi / Kardiologi:</p>
                <p className="font-bold text-gray-700">{selectedResult.doctorName}</p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedResult(null)}>
                Tutup
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Lembar</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert(`Mengunduh PDF resmi bertanda tangan digital: ${selectedResult.pdfDownloadName}`);
                }}
                className="inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh PDF</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
