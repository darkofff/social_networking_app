interface Props {
  content: string;
  isCurrentUserSender: boolean;
  profile_pic: string;
}

function MessageRow({ content, isCurrentUserSender, profile_pic }: Props) {
  return (
    <div
      className={`flex  p-1 ${isCurrentUserSender ? "justify-end" : "justify-start"}`}
    >
      {isCurrentUserSender ? (
        <div className="flex w-4/5 items-center justify-end gap-x-2   sm:w-2/3">
          <div className=" flex  min-h-10 items-center justify-end rounded-lg border bg-green-700/70 p-1 px-2  text-green-50  dark:border-neutral-700 dark:bg-green-500/30 ">
            <div>{content}</div>
          </div>
        </div>
      ) : (
        <div className="flex w-4/5  items-center gap-x-2  sm:w-2/3">
          <div className="">
            <div
              className="h-10 w-10 rounded-full bg-neutral-300 bg-cover bg-center"
              style={{
                backgroundImage: `url(${profile_pic || "/anonymous/profile_pic_anon.png"})`,
              }}
            ></div>
          </div>
          <div className=" flex min-h-10 items-center rounded-lg border  bg-neutral-200/50 p-1 px-2 dark:border-neutral-700 dark:bg-neutral-600">
            <div>{content}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageRow;
