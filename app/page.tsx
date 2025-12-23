
import { CommentForm } from "@/src/components/CommentForm";
import { CommentList } from "@/src/components/CommentList";
import { Suspense } from "react";

export default function Home() {
  return (
    // 背景色を薄いグレー(bg-slate-50)にして、カード(白)を浮かび上がらせる
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー部分 */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Feedback Hub
          </h1>
          <p className="text-slate-500">皆様からの貴重なコメントをお待ちしております</p>
        </header>

        {/* グリッドレイアウト: PCでは2カラム、スマホでは1カラム */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 左側：投稿フォーム (12列中 5列分を使用) */}
          <section className="lg:col-span-5 lg:sticky lg:top-8">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 px-1">
              New Comment
            </h2>
            <CommentForm />
          </section>

          {/* 右側：コメント一覧 (12列中 7列分を使用) */}
          <section className="lg:col-span-7">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 px-1">
              Recent Activity
            </h2>
            {/* データ取得中に「読み込み中...」を出すための Suspense 
              将来的にスケルトン画面（骨組み）を入れるとよりプロっぽくなります
            */}
            <Suspense fallback={
              <div className="p-12 text-center text-slate-400">読み込み中...</div>
            }>
              <CommentList />
            </Suspense>
          </section>

        </div>
      </div>
    </main>
  );
}
