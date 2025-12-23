"use server";

import z from "zod";
import { Comment, CommentFormState, CommentSchema, CreateCommentSchema } from "../types/Comment";
import { revalidatePath } from "next/cache";

export async function getComments(): Promise<Comment[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments",
        {
            next: {
                revalidate: 60
            }
        }
    );
    if (!response.ok) {
        console.log(`コメント取得に失敗しました：${response.status}`)
        return [];
    }

    const result = z.array(CommentSchema).safeParse(await response.json());

    if (!result.success) {
        console.log(`取得したデータ形式が正しくありません:${result.error}`);
        return [];
    }

    return result.data;
}

export async function createCommentAction(
    prevState: CommentFormState, formData: FormData
): Promise<CommentFormState> {
    const result = CreateCommentSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        body: formData.get("body")
    });

    if (!result.success) {
        return {
            message: "入力内容に誤りがあります",
            errors: z.treeifyError(result.error).properties,
            success: false
        }
    }

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/comments",
            {
                method: "POST",
                body: JSON.stringify({ ...result.data, id: 1, postId: 1 }),
                headers: { "Content-Type": "application/json" },
            }
        )

        if (!response.ok) {
            throw Error();
        }

        revalidatePath("/");

        return {
            message: "コメントの投稿に成功しました！",
            success: true
        };

    } catch {
        return {
            message: "エラーが発生しました",
            success: false
        };
    }
}