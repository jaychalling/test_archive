const { Client } = require("@notionhq/client");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const PAGE_ID = process.env.NOTION_PAGE_ID;

async function cleanupMainPage() {
    try {
        console.log("⏳ 메인 페이지의 기존 블록을 조회 중...");
        const response = await notion.blocks.children.list({ block_id: PAGE_ID });

        // 삭제할 블록 찾기 (제목이 "업데이트 기록"으로 시작하거나 특정 패턴인 것들)
        // 여기서는 안전하게 사용자가 지우고 싶어할 만한 블록들을 식별합니다.
        // 이전 스크립트에서 추가한 blocks: heading_2 (업데이트 기록), paragraph, code

        let blocksToDelete = [];
        let foundStart = false;

        for (const block of response.results) {
            if (block.type === 'heading_2' && block.heading_2.rich_text[0]?.plain_text.includes("업데이트 기록")) {
                foundStart = true;
            }

            if (foundStart) {
                blocksToDelete.push(block.id);
            }
        }

        if (blocksToDelete.length === 0) {
            console.log("ℹ️ 삭제할 기존 기록 블록을 찾지 못했습니다.");
            return;
        }

        console.log(`🗑️ ${blocksToDelete.length}개의 블록을 삭제 중...`);
        for (const blockId of blocksToDelete) {
            await notion.blocks.delete({ block_id: blockId });
        }

        console.log("✅ 완료: 메인 페이지의 중복된 기록을 모두 삭제했습니다.");
    } catch (error) {
        console.error("❌ 실패:", error.message);
    }
}

cleanupMainPage();
