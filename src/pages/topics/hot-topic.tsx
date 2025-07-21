import { MousePointerClick, User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
} from "../../components/ui";
import { useNavigate } from "react-router";

interface Props {
  props: {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
    content: string;
  };
}

function HotTopicCard({ props }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-w-58 flex flex-col gap-2 cursor-pointer"
      onClick={() => navigate(`/topics/${props.id}`)}
    >
      <Card
        className="relative w-full h-72 bg-center bg-cover border-none"
        style={{ backgroundImage: `url(${props.thumbnail})` }}
      >
        <div className="absolute bottom-0 z-10 flex items-end justify-between p-4 gap-2">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight line-clamp-3">
            {props.title}
          </h3>
          <Button variant="secondary" size="icon">
            <MousePointerClick />
          </Button>
        </div>
        {/* 그라데이션 적용 div */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/50 to-transparent rounded-b-xl"></div>
      </Card>
      <div className="w-full flex items-center gap-2">
        <div className="relative flex items-center">
          <Avatar className="w-9 h-9 dark:bg-input/50">
            <AvatarImage
              src={"https://github.com/9diin.png"}
              alt="img"
              className="object-cover"
            />
            <AvatarFallback>
              <User className="w-4 h-4 text-neutral-500/50" />
            </AvatarFallback>
          </Avatar>
          {/* {props?.author.role === "admin" && <BadgeCheck className="absolute bottom-0 right-0 w-[14px] h-[14px] text-foreground" fill="#3B82F6" />} */}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-[2px] text-muted-foreground">
            <p className="text-xs">크리에이티브</p>
            &middot;
            <p className="text-xs">크리에이터</p>
          </div>
          <small className="text-sm font-medium">개발자 9Diin</small>
        </div>
      </div>
    </div>
  );
}

export { HotTopicCard };
