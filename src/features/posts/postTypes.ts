export interface LikeAction {
  post_id: number;
  currentUsername: string;
  isPostLiked: boolean;
  user_id?: string;
}
