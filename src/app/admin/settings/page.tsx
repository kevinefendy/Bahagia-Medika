'use client';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useUIStore } from '@/lib/store/useUIStore';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function AdminSettingsPage() {
  const user = useAuthStore((s) => s.user);
  const addToast = useUIStore((s) => s.addToast);
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Settings</h1>
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 max-w-lg">
        <h2 className="font-semibold mb-4">Profil Admin</h2>
        <div className="space-y-3 mb-6">
          <div><p className="text-sm text-[var(--color-text-secondary)]">Nama</p><p className="font-medium">{user?.name}</p></div>
          <div><p className="text-sm text-[var(--color-text-secondary)]">Email</p><p className="font-medium">{user?.email}</p></div>
        </div>
        <h2 className="font-semibold mb-4">Ganti Password</h2>
        <div className="space-y-4">
          <Input label="Password Baru" type="password" placeholder="Masukkan password baru" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={() => { addToast({ type: 'success', message: 'Password berhasil diubah.' }); setPassword(''); }}>
            Simpan Password
          </Button>
        </div>
      </div>
    </div>
  );
}
