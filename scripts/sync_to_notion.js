const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");
// .env 파일을 명시적으로 로드
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const PARENT_PAGE_ID = process.env.NOTION_PAGE_ID;

async function syncHistoryToNotion() {
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_PAGE_ID) {
        console.error("❌ 에러: NOTION_TOKEN 또는 NOTION_PAGE_ID가 .env 파일에 설정되지 않았습니다.");
        return;
    }

    const historyPath = path.resolve(__dirname, "../planning/history.md");
    const historyContent = fs.readFileSync(historyPath, "utf-8");

    try {
        console.log("⏳ 노션에 새 하위 페이지 생성 및 기록 중...");

        // 1. 새 하위 페이지 생성
        const newPage = await notion.pages.create({
            parent: { page_id: PARENT_PAGE_ID },
            properties: {
                title: {
                    title: [
                        {
                            text: {
                                content: `🚀 개발 히스토리 (${new Date().toLocaleDateString()})`,
                            },
                        },
                    ],
                },
            },
        });

        // 2. 생성된 페이지에 마크다운 내용 추가
        await notion.blocks.children.append({
            block_id: newPage.id,
            children: [
                {
                    object: "block",
                    type: "callout",
                    callout: {
                        rich_text: [{ type: "text", text: { content: "이 페이지는 시스템에 의해 자동으로 생성되었습니다. history.md의 내용이 포함되어 있습니다." } }],
                        icon: { emoji: "📝" },
                        color: "blue_background"
                    }
                },
                {
                    object: "block",
                    type: "code",
                    code: {
                        caption: [],
                        rich_text: [{ type: "text", text: { content: historyContent.substring(0, 2000) } }],
                        language: "markdown"
                    }
                }
            ],
        });

        console.log("✅ 성공: 노션에 새로운 페이지로 히스토리가 기록되었습니다!");
        console.log(`🔗 생성된 페이지 ID: ${newPage.id}`);
    } catch (error) {
        console.error("❌ 실패:", error.message);
    }
}

syncHistoryToNotion();
