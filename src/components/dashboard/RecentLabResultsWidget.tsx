'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FileText, ChevronRight, CheckCircle, AlertTriangle, Download, Eye, Stethoscope } from 'lucide-react';
import { usePatientRecordStore } from '@/lib/store/usePatientRecordStore';
import type { LabResultItem } from '@/types/patientRecord';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function RecentLabResultsWidget() {
  const { labResults } = usePatientRecordStore();
  const [selectedLab, setSelectedLab] = useState<LabResultItem | null>(null);

  return (
    <>
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-50 text-[var(--color-primary)]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--color-text-primary)]">
                  Hasil Laboratorium & Diagnostik
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Hasil resmi tervalidasi dokter penanggung jawab
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/hasil-lab"
              className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-0.5"
            >
              Semua Hasil <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Test List */}
          <div className="space-y-3">
            {labResults.slice(0, 3).map((lab) => (
              <div
                key={lab.id}
                className="p-3.5 rounded-xl border border-gray-100 hover:border-teal-200 bg-white hover:bg-teal-50/20 transition-all cursor-pointer group"
                onClick={() => setSelectedLab(lab)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2 py-0.5 rounded">
                      {lab.category}
                    </span>
                    <h4 className="font-bold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors mt-1.5 leading-snug">
                      {lab.title}
                    </h4>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                      Tanggal: {lab.testDate} &bull; Dr. {lab.doctorName.replace('Dr. ', '')}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                      lab.status === 'Normal'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {lab.status === 'Normal' ? (
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                    )}
                    {lab.status}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-dashed border-gray-100">
                  <span className="text-[var(--color-text-secondary)] line-clamp-1 max-w-[240px]">
                    {lab.summary}
                  </span>
                  <span className="font-bold text-[var(--color-primary)] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                    Lihat <Eye className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
          <span>Dilengkapi tanda tangan digital laboratorium</span>
          <Link
            href="/dashboard/hasil-lab"
            className="font-semibold text-[var(--color-primary)] hover:underline"
          >
            Unduh Arsip PDF
          </Link>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLab && (
        <Modal
          isOpen={!!selectedLab}
          onClose={() => setSelectedLab(null)}
          title={`Hasil Pemeriksaan: ${selectedLab.title}`}
          size="lg"
        >
          <div className="space-y-4 py-1">
            {/* Header info */}
            <div className="bg-[var(--color-surface)] p-3.5 rounded-xl border border-[var(--color-border)] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <p className="text-gray-500">No. Dokumen:</p>
                <p className="font-mono font-bold text-[var(--color-text-primary)]">{selectedLab.testCode}</p>
              </div>
              <div>
                <p className="text-gray-500">Tanggal Tes:</p>
                <p className="font-semibold">{selectedLab.testDate}</p>
              </div>
              <div>
                <p className="text-gray-500">Dokter Pengirim:</p>
                <p className="font-semibold truncate">{selectedLab.doctorName}</p>
              </div>
              <div>
                <p className="text-gray-500">Analis / Radiolog:</p>
                <p className="font-semibold truncate">{selectedLab.analystName}</p>
              </div>
            </div>

            {/* Parameter Table */}
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">
                Rincian Parameter & Nilai Rujukan
              </h5>
              <div className="border border-gray-200 rounded-xl overflow-hidden overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                    <tr>
                      <th className="p-2.5">Pemeriksaan</th>
                      <th className="p-2.5">Hasil</th>
                      <th className="p-2.5">Satuan</th>
                      <th className="p-2.5">Nilai Rujukan</th>
                      <th className="p-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedLab.parameters.map((p, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/60">
                        <td className="p-2.5 font-medium text-gray-800">{p.parameter}</td>
                        <td className="p-2.5 font-mono font-bold text-gray-900">{p.value}</td>
                        <td className="p-2.5 text-gray-500">{p.unit || '-'}</td>
                        <td className="p-2.5 text-gray-600">{p.normalRange}</td>
                        <td className="p-2.5 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                              p.status === 'Normal'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Conclusion */}
            <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200/70 text-xs space-y-1">
              <p className="font-bold text-[var(--color-primary)] flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5" />
                Kesimpulan Klinis:
              </p>
              <p className="text-gray-700 leading-relaxed">{selectedLab.conclusion}</p>
              {selectedLab.recommendations && (
                <p className="text-gray-600 pt-1 text-[11px]">
                  <strong>Saran:</strong> {selectedLab.recommendations}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-between items-center gap-2 pt-2 border-t border-gray-100">
              <span className="text-[11px] text-gray-500 italic">
                Validasi Digital: RS Bahagia Medika Jakarta
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedLab(null)}>
                  Tutup
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    alert(`Mengunduh dokumen resmi: ${selectedLab.pdfDownloadName}`);
                  }}
                  className="flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh PDF Resmi</span>
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
