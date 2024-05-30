interface Props {
  content: string;
  isCurrentUserSender: boolean;
}

function MessageRow({ content, isCurrentUserSender }: Props) {
  return (
    <div
      className={`flex  p-1 ${isCurrentUserSender ? "justify-end" : "justify-start"}`}
    >
      {isCurrentUserSender ? (
        <div className="flex min-h-10 w-4/5 items-center justify-end  gap-x-2 rounded-lg border bg-neutral-200/50 p-1 px-2 sm:w-2/3">
          <div>{content}</div>
          {/*  <div className="">
            <div className="h-10 w-10 rounded-full bg-red-200"></div>
          </div> */}
        </div>
      ) : (
        <div className="flex   w-2/3 items-center  gap-x-2">
          <div className="">
            <div className="h-10 w-10 rounded-full bg-red-200"></div>
          </div>
          <div className=" flex min-h-10 items-center rounded-lg  border bg-neutral-200/50 p-1 px-2">
            <div>{content}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageRow;
