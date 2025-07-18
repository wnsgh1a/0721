import { useRef, useState } from "react";
import supabase from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

import { AppFooter, AppHeader } from "@/components/common";
import { TextEditor } from "@/components/topics";

import { Button, Input, Label, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Separator } from "@/components/ui";
import { ArrowLeft, Asterisk, Image, ImageOff, Rocket } from "lucide-react";
import { CREATE_TOPIC_CATEGORY } from "@/constants/topic-category.constant";
import { toast } from "sonner";

function NewTopic() {
    const [title, setTitle] = useState<string>(""); // 토픽 제목 상태 값
    const [category, setCategory] = useState<string>(""); // 카테고리 상태 값
    const [thumbnail, setThumbnail] = useState<string | File | null>(null);
    // const [content, setContent] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setThumbnail(file ?? null);

        // 동일 파일 선택이 가능하므로 value 초기화
        event.target.value = "";
    };
    const handleRenderPreview = () => {
        if (typeof thumbnail === "string") {
            return <img src={thumbnail} alt="thumbnail" className="w-full aspect-video rounded-lg object-cover border" />;
        } else if (thumbnail instanceof File) {
            return <img src={URL.createObjectURL(thumbnail)} alt="thumbnail" className="w-full aspect-video rounded-lg object-cover border" />;
        }

        return (
            <div className="w-full flex items-center justify-center aspect-video bg-card rounded-lg">
                <Button size={"icon"} variant={"ghost"} onClick={() => fileInputRef.current?.click()}>
                    <Image />
                </Button>
            </div>
        );
    };

    const onSubmit = async () => {
        let uploadedThumbnailUrl: string | null = null; // => 임시 저장일 경우에는 썸네일이 없어도 임시 저장 기능 구현은 가능해야 하기 때문에 타입 null을 허용한다.

        if (!title || !category || !thumbnail) {
            toast.error("제목, 카테고리, 썸네일, 콘텐츠는 필수 값입니다.");
            return;
        }

        if (thumbnail instanceof File) {
            const fileExt = thumbnail.name.split(".").pop();
            const filePath = `topic_thumbnails/${uuidv4()}.${fileExt}`;

            const { error } = await supabase.storage.from("files").upload(filePath, thumbnail, {
                cacheControl: "3600",
                upsert: false,
            });

            if (error) {
                toast.error("파일 업로드에 실패했습니다.");
                return;
            }

            const {
                data: { publicUrl },
            } = supabase.storage.from("files").getPublicUrl(filePath);

            if (publicUrl) uploadedThumbnailUrl = publicUrl;
            else throw new Error("Supabase Storage Public URL Error!");
        } else if (typeof thumbnail === "string") {
            // 이미 업로드된 이미지 URL
            uploadedThumbnailUrl = thumbnail;
        }

        // return 받은 url을 thumbnail에 할당
        const { error } = await supabase
            .from("topics")
            .insert([{ title, category, thumbnail: uploadedThumbnailUrl }])
            .select();

        if (error) {
            toast.error("토픽 등록에 실패했습니다.");
            return;
        }
        toast.success("토픽이 성공적으로 등록되었습니다!");
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
