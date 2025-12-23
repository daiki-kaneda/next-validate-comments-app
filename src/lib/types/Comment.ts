import { z } from 'zod';

//   {
//     "postId": 1,
//     "id": 2,
//     "name": "quo vero reiciendis velit similique earum",
//     "email": "Jayne_Kuhic@sydney.com",
//     "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
//   }

export const CommentSchema = z.object({
    postId: z.number(),
    id: z.number(),
    name: z.string().min(1, '名前は必須です'),
    email: z.email('有効なメールアドレスを入力してください'),
    body: z.string().min(5, 'コメントは五文字以上入力してください')
});

export const CreateCommentSchema = CommentSchema.omit({
    postId: true,
    id: true
})

export type Comment = z.infer<typeof CommentSchema>;
export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;

export type CommentFormState = {
    errors?: {
        name?: { errors: string[] };
        email?: { errors: string[] };
        body?: { errors: string[] };
    }
    message?: string | null;
    success?: boolean;
}