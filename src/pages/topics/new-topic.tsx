import { useRef, useState } from "react";
import supabase from "@/lib/supabase";

import { AppFooter, AppHeader } from "@/components/common";
import { TextEditor } from "@/components/topics";

import { Button, Input, Label, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Separator, Skeleton } from "@/components/ui";
import { ArrowLeft, Asterisk, Image, ImageOff, Rocket } from "lucide-react";
import { CREATE_TOPIC_CATEGORY } from "@/constants/topic-category.constant";

function NewTopic() {
    const [title, setTitle] = useState<string>(""); // 토픽 제목 상태 값
    const [category, setCategory] = useState<string>(""); // 카테고리 상태 값
    const [thumbnail, setThumbnail] = useState<string | File | null>(null);
    // const [content, setContent] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 파일 변경 감지 및 상위 컴포넌트로 전달
    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
        const file = event.target.files?.[0];
        setThumbnail(file ?? null);
        // 동일 파일 선택 가능하도록 value 초기화
        event.target.value = "";
    };

    // 3. 이미지 미리보기 렌더링
    const handleRenderPreview = () => {
        console.log(thumbnail);

        if (typeof thumbnail === "string") {
            return <img src={thumbnail} alt="thumbnail" className="w-full aspect-video object-cover border rounded-lg" />;
        } else if (thumbnail instanceof File) {
            return <img src={URL.createObjectURL(thumbnail)} alt="thumbnail" className="w-full aspect-video object-cover border rounded-lg" />;
        }

        return (
            <div className="w-full flex items-center justify-center aspect-video border rounded-lg bg-card">
                <Button variant={"ghost"} size={"icon"} onClick={() => fileInputRef.current?.click()}>
                    <Image />
                </Button>
            </div>
        );
    };

    const onSubmit = async () => {
        const { data, error } = await supabase.from("topics").insert([{ title, category }]).select();
    };

    return (
        <div className="page">
            <AppHeader />
            <div className="container">
                <div className="w-full h-full flex flex-col p-6 gap-6">
                    {/* 토픽 제목 입력란 */}
                    <Input placeholder="토픽 제목을 입력하세요." className="h-16 px-6 border-none !text-lg placeholder:text-lg" onChange={(event) => setTitle(event.target.value)} />
                    <Separator />
                    <div className="w-full flex items-start gap-6">
                        <div className="w-[308px] min-w-[308px] flex flex-col gap-6">
                            <div className="w-full flex items-center gap-2">
                                <Button variant={"outline"} size={"icon"}>
                                    <ArrowLeft />
                                </Button>
                                <Button variant={"outline"}>임시 저장</Button>
                                <Button variant={"destructive"} className="flex-1" onClick={onSubmit}>
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
                                <Select onValueChange={setCategory}>
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
                                {handleRenderPreview()}
                                <Input type="file" ref={fileInputRef} onChange={handleChangeFile} className="hidden" />
                            </div>
                            <Separator className="-my-4" />
                            <Button variant={"outline"} onClick={() => setThumbnail(null)}>
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
