import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { AppFooter, AppHeader } from "./components/common";
import { SkeletonHotTopic, SkeletonNewTopic } from "./components/skeleton";
import { TOPIC_CATEGORY } from "./constants/topic-category.constant";

import { Button } from "./components/ui";
import { ChevronDown, PencilLine } from "lucide-react";
import supabase from "./lib/supabase";

interface Topic {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
    content: string;
}

function App() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState<Topic[]>([]);

    const getTopics = async () => {
        const { data, error } = await supabase.from("topics").select("*");

        if (data) setTopics(data); // => data의 length가 0일 경우에는, UI로 처리
        else if (error) throw new Error("토픽 조회 중 알 수 없는 에러가 발생했습니다.");
    };

    useEffect(() => {
        getTopics();
    }, []);

    return (
        <div className="page">
            <AppHeader />
            <div className="container">
                <div className="w-full h-full flex items-start p-6 gap-6">
                    {/* 카테고리(메뉴) 선택 영역 */}
                    <div className="w-[252px] min-w-[252px] h-full flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">카테고리</h4>
                            <ChevronDown />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            {TOPIC_CATEGORY.map((category) => {
                                return (
                                    <Button variant={"ghost"} className="w-full flex items-center justify-start text-neutral-500 hover:pl-6 transition-all duration-300">
                                        {category.icon}
                                        {category.label}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    {/* 작성된 HOT 토픽 & NEW 토픽 영역 */}
                    <div className="w-4/5 flex flex-col gap-12">
                        {/* HOT 토픽 영역 */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <img src="src/assets/gifs/fire.gif" alt="" className="h-7 w-7 mb-[2px]" />
                                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">핫 토픽</h4>
                                </div>
                                <p className="text-neutral-500 text-base">지금 가장 주목받는 주제들을 살펴보고, 다양한 관점의 인사이트를 얻어보세요.</p>
                            </div>
                            {/* 실제 HOT 토픽 카드 UI 영역 */}
                            <div className="grid grid-cols-4 gap-6">
                                {topics.map((topic: Topic) => {
                                    return <SkeletonHotTopic props={topic} />;
                                })}
                                {/* <SkeletonHotTopic />
                                <SkeletonHotTopic />
                                <SkeletonHotTopic /> */}
                            </div>
                        </div>
                        {/* NEW 토픽 영역 */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <img src="src/assets/gifs/writing-hand.gif" alt="" className="h-7 w-7 mb-[2px]" />
                                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">NEW 토픽</h4>
                                </div>
                                <p className="text-neutral-500 text-base">새로운 시선으로, 새로운 이야기를 시작하세요. 지금 바로 당신의 토픽을 만들어보세요.</p>
                            </div>
                            {/* 실제 NEW 토픽 카드 UI 영역 */}
                            <div className="w-full grid grid-cols-2 gap-6">
                                <SkeletonNewTopic />
                                <SkeletonNewTopic />
                                <SkeletonNewTopic />
                                <SkeletonNewTopic />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
            <Button variant={"destructive"} className="fixed bottom-8 !px-6 !py-5 rounded-full" onClick={() => navigate("/topics/new-topic")}>
                <PencilLine />
                토픽 작성하기
            </Button>
        </div>
    );
}

export default App;
