
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { generateQuestions } from '../services/geminiService';
import GameScreen from './GameScreen';

interface DailyChallengeScreenProps {
    onBack: () => void;
}

const DailyChallengeScreen: React.FC<DailyChallengeScreenProps> = ({ onBack }) => {
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    // This is a placeholder for a real game session.
    // In a full implementation, you would manage the daily game state here.
    const [gameInProgress, setGameInProgress] = useState(false);


    useEffect(() => {
        const fetchDailyQuestions = async () => {
            try {
                // Using date as a seed for topic consistency, though the API doesn't support seeding directly.
                // A backend would typically handle this for true consistency.
                const today = new Date();
                const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
                const topics = ["Khoa học", "Địa lý", "Lịch sử Việt Nam", "Văn hóa đại chúng", "Thể thao"];
                const dailyTopic = topics[dayOfYear % topics.length];
                
                const dailyQuestions = await generateQuestions(dailyTopic, 15, 'mixed');
                if (dailyQuestions.length < 15) {
                    throw new Error("Không thể tạo đủ 15 câu hỏi cho thử thách hôm nay.");
                }
                setQuestions(dailyQuestions);
                setGameInProgress(true);

            } catch (e: any) {
                setError(e.message || "Lỗi khi tải thử thách hàng ngày.");
            }
        };

        fetchDailyQuestions();
    }, []);

    // Placeholder game end handler for daily challenge
    const handleDailyGameEnd = () => {
        alert("Bạn đã hoàn thành thử thách hàng ngày!");
        onBack();
    };

    if (error) {
        return (
             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 text-center">
                 <h1 className="text-4xl font-bold text-red-500 mb-4">Đã xảy ra lỗi</h1>
                 <p className="text-lg">{error}</p>
                 <button onClick={onBack} className="mt-6 px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700">Quay lại</button>
            </div>
        )
    }

    if (!questions || !gameInProgress) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-white bg-indigo-900">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
                <p className="mt-4 text-xl">Đang chuẩn bị thử thách hôm nay...</p>
            </div>
        );
    }

    // This is a simplified setup. A real implementation would have its own GameScreen variant.
    // For now, we reuse GameScreen but it won't be perfect.
    return (
        <div className="text-white">
            <h1 className="text-center text-3xl font-bold pt-4 bg-[#1e124d]">Thử thách Hàng ngày</h1>
             <p className="text-center text-lg text-yellow-400 bg-[#1e124d]">Mọi người đều chơi cùng một bộ câu hỏi hôm nay!</p>
             <button onClick={onBack} className="absolute top-4 left-4 z-50 text-white hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
            </button>
            {/* This part is a mock for now. It doesn't use the real GameScreen state properly. */}
            <div className="text-center p-8">
                 <p className="text-2xl">Tính năng Thử thách Hàng ngày đang được phát triển.</p>
                 <p>Hôm nay bạn sẽ trả lời các câu hỏi về chủ đề <span className="font-bold text-teal-400">Khoa học</span>.</p>
            </div>
        </div>
    );
};

export default DailyChallengeScreen;
