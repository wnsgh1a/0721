import { AppFooter, AppHeader } from "@/components/common";
import { TextEditor } from "@/components/topics";
import { Button, Input, Label, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Separator, Skeleton } from "@/components/ui";
import { CREATE_TOPIC_CATEGORY } from "@/constants/topic-category.constant";
import { ArrowLeft, Asterisk, ImageOff, Rocket } from "lucide-react";

function NewTopic() {
    return (
        <div className="page">
            <AppHeader />
            <div className="container">
                <div className="w-full h-full flex flex-col p-6 gap-6">
                    {/* 토픽 제목 입력란 */}
                    <Input placeholder="토픽 제목을 입력하세요." className="h-14 px-6 border-none !text-lg placeholder:text-lg" />
                    <Separator />
                    <div className="w-full flex items-start gap-6">
                        <div className="w-[308px] min-w-[308px] flex flex-col gap-6">
                            <div className="w-full flex items-center gap-2">
                                <Button variant={"outline"} size={"icon"}>
                                    <ArrowLeft />
                                </Button>
                                <Button variant={"outline"}>임시 저장</Button>
                                <Button variant={"destructive"} className="flex-1">
                                    <Rocket />
                                    토픽 발행하기
                                </Button>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-1">
                                    <Asterisk className="w-[14px] h-[14px] text-[#f96859]" />
                                    <Label>카테고리</Label>
                                </div>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="카테고리(주제) 선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>토픽 카테고리(주제)</SelectLabel>
                                            {CREATE_TOPIC_CATEGORY.map((item) => {
                                                return <SelectItem value={item.category}>{item.label}</SelectItem>;
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-1">
                                    <Asterisk className="w-[14px] h-[14px] text-[#f96859]" />
                                    <Label>썸네일</Label>
                                </div>
                                <Skeleton className="w-full aspect-video" />
                            </div>
                            <Separator className="-my-4" />
                            <Button variant={"outline"}>
                                <ImageOff />
                                썸네일 제거
                            </Button>
                        </div>
                        <div className="flex-1">
                            <TextEditor />
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}

export default NewTopic;
