"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionState } from "react";
import { createCommentAction } from "../lib/actions/comment";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommentFormState } from "../lib/types/Comment";
import { Textarea } from "@/components/ui/textarea";

const initialState: CommentFormState = {
    message: "",
    success: false
}

export function CommentForm() {
    const [state, formAction, isPending] = useActionState(
        createCommentAction,
        initialState
    );

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>コメントを投稿する</CardTitle>
            </CardHeader>
            <CardContent>
                {/* space-y-4 で各要素の間に余白を作る */}
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">お名前</Label>
                        <Input id="name" name="name" placeholder="山田 太郎" disabled={isPending} />
                        {state?.errors?.name && (
                            <p className="text-destructive text-sm">{state.errors.name.errors[0]}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input id="email" name="email" type="email" placeholder="xxx@example.com" disabled={isPending} />
                        {state?.errors?.email && (
                            <p className="text-destructive text-sm">{state.errors.email.errors[0]}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="body">コメント本文</Label>
                        <Textarea id="body" name="body" placeholder="コメントを入力してください" rows={4} disabled={isPending} />
                        {state?.errors?.body && (
                            <p className="text-destructive text-sm">{state.errors.body.errors[0]}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={isPending} className="w-full">
                        {isPending ? "送信中..." : "投稿する"}
                    </Button>
                </form>
            </CardContent>
            {/* メッセージがある場合のみ CardFooter を表示 */}
            {state.message && (
                <CardFooter>
                    <p className={`w-full text-center text-sm font-medium p-2 rounded-lg ${
                        state.success ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
                    }`}>
                        {state.message}
                    </p>
                </CardFooter>
            )}
        </Card>
    );
}