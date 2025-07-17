import { Skeleton } from "../ui";

function SkeletonHotTopic() {
    return (
        <div className="w-full flex flex-col gap-2">
            <Skeleton className="w-full h-[288px]" />
            <div className="w-full flex items-center gap-2">
                <Skeleton className="min-w-10 w-10 h-10 rounded-full" />
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-24 h-4" />
                </div>
            </div>
        </div>
    );
}

export { SkeletonHotTopic };
