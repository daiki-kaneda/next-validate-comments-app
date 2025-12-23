import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getComments } from "../lib/actions/comment";
import { Badge } from "@/components/ui/badge";

export async function CommentList() {
    const comments = await getComments();

    if (comments.length == 0) {
        return (
            <div className="text-center p-8 text-muted-foreground">
                まだコメントはありません。
            </div>
        );
    }

    return (
        <div className="space-y-4 max-w-md mx-auto mt-8">
            <h2 className="text-xl font-bold px-1">コメント一覧 ({comments.length}件)</h2>

            {comments.slice(0, 10).map((c) => (
                <Card key={c.id} className="shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            {/* 名前の表示：CardTitle を使うと一貫性が出ます */}
                            <CardTitle className="text-sm font-bold text-blue-600">
                                {c.name}
                            </CardTitle>
                            <Badge variant="outline" className="text-[10px]">
                                ID: {c.id}
                            </Badge>
                        </div>
                        {/* メアドもDTOにあるので、補足情報として表示 */}
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                    </CardHeader>
                    <CardContent>
                        {/* 本文：leading-relaxed で読みやすく */}
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {c.body}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}