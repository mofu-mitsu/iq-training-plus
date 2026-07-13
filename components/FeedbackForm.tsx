"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Send, MessageSquare } from 'lucide-react';
import { useStore } from '../lib/store';
import { auth } from '../lib/firebase';

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    // Hardcoded GAS URL to match TrainingModule
    const gasUrl = "https://script.google.com/macros/s/AKfycbxJKfKT3_zlZTc_Rg9kRrUj7xqBE21tAbEf98dQyBfpN9QvLZ18p--b9q3TMnUD6wc84Q/exec";

    setIsSubmitting(true);
    try {
      const user = auth.currentUser;
      const data = {
        userId: user ? user.uid : 'guest',
        gameId: 'feedback', // Identify this as a feedback submission
        score: 0,
        questionCount: 0,
        xp: 0,
        level: useStore.getState().level,
        history: [
          {
            question: "【フィードバック/要望】",
            userAnswer: feedback,
            isCorrect: true // Just so it shows a circle or nothing weird
          }
        ]
      };

      // Using text/plain and no-cors to avoid CORS errors from GAS
      await fetch(gasUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(data),
      });

      toast.success('フィードバックを送信しました。ご協力ありがとうございます！');
      setFeedback('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-12 mb-8">
        <button
          onClick={() => setIsOpen(true)}
          className="mx-auto flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-600 transition-colors text-slate-300 font-medium text-sm"
        >
          <MessageSquare className="w-4 h-4" />
          バグ報告・ご要望はこちら
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 mb-8 bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          フィードバック
        </h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        問題がおかしかった、こんな機能が欲しいなど、お気軽にお送りください！
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="ここに入力..."
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all min-h-[120px] resize-y"
          disabled={isSubmitting}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !feedback.trim()}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-2.5 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              '送信中...'
            ) : (
              <>
                <Send className="w-4 h-4" />
                送信する
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
