export type Model = {
    id: string;
    name: string;
    provider: string;
};

export const MODELS: Model[] = [
    { id: 'gemini-2.0-flash', provider: 'Google', name: 'Gemini Flash 2.0' },
    { id: 'gemini-2.0-flash-lite-preview-02-05', provider: 'Google', name: 'Gemini Flash Lite 2.0' },
    { id: 'qwen/qwen2.5-vl-72b-instruct:free', provider: 'Qwen', name: 'Qwen2.5 VL' },
    { id: 'deepseek/deepseek-r1:free', provider: 'DeepSeek', name: 'DeepSeek R1' },
    { id: 'nvidia/llama-3.1-nemotron-70b-instruct:free', provider: 'NVIDIA', name: 'Llama 3.1' },
    { id: 'google/gemini-2.0-pro-exp-02-05:free', provider: 'Google', name: 'Gemini Pro 2.0' },
];