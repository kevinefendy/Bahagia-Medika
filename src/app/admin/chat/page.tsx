'use client';
import { useState } from 'react';
import { Send, ArrowLeft, MessageCircle } from 'lucide-react';
import { useChatStore } from '@/lib/store/useChatStore';

export default function AdminChatPage() {
  const { conversations } = useChatStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState('');

  const csConversations = conversations.filter(c => c.channel === 'customer-service');
  const selected = csConversations.find(c => c.id === selectedId);

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6">Chat Admin</h1>

      <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-210px)] min-h-[460px]">
        {/* Conversation List: hidden on mobile if chat is open */}
        <div className={`w-full md:w-72 bg-white rounded-xl border border-[var(--color-border)] overflow-hidden shrink-0 flex flex-col ${
          selectedId ? 'hidden md:flex' : 'flex'
        }`}>
          <div className="p-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]/50 flex items-center justify-between">
            <p className="font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              Percakapan ({csConversations.length})
            </p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {csConversations.length === 0 ? (
              <p className="p-6 text-xs text-[var(--color-text-secondary)] text-center">Belum ada percakapan masuk</p>
            ) : (
              csConversations.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`w-full text-left p-3.5 hover:bg-[var(--color-surface)] transition-colors ${
                    selectedId === c.id ? 'bg-[var(--color-primary-light)]' : ''
                  }`}
                >
                  <p className="font-bold text-xs text-gray-900">{c.title}</p>
                  <p className="text-[11px] text-[var(--color-text-secondary)] truncate mt-0.5">
                    {c.messages[c.messages.length - 1]?.text || 'Percakapan baru'}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area: hidden on mobile if no chat is selected */}
        <div className={`flex-1 bg-white rounded-xl border border-[var(--color-border)] flex flex-col ${
          !selectedId ? 'hidden md:flex' : 'flex'
        }`}>
          {selected ? (
            <>
              {/* Header with back button on mobile */}
              <div className="p-3 border-b border-[var(--color-border)] flex items-center justify-between bg-gray-50/70">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="md:hidden p-1.5 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                    aria-label="Kembali ke daftar percakapan"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-gray-900">{selected.title}</p>
                    <p className="text-[10px] text-emerald-600 font-semibold">Online &bull; Kanal Customer Service</p>
                  </div>
                </div>
              </div>

              {/* Messages scroll */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {selected.messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-[var(--color-surface)] text-gray-800 rounded-bl-xs'
                        : 'bg-[var(--color-primary)] text-white rounded-br-xs'
                    }`}>
                      <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input reply form */}
              <div className="border-t border-[var(--color-border)] p-3">
                <form onSubmit={(e) => { e.preventDefault(); if (reply.trim()) { setReply(''); } }} className="flex gap-2">
                  <input
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Ketik balasan sebagai admin rumah sakit..."
                    className="flex-1 px-3 py-2 text-xs sm:text-sm border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                  <button
                    type="submit"
                    disabled={!reply.trim()}
                    className="p-2.5 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] disabled:opacity-40 transition-colors shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-[var(--color-text-secondary)]">
              <MessageCircle className="w-10 h-10 text-gray-300 mb-2" />
              <p className="font-semibold text-sm text-gray-700">Pilih Percakapan</p>
              <p className="text-xs text-gray-400 mt-1">Pilih salah satu tiket konsultasi pasien untuk mulai membalas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
