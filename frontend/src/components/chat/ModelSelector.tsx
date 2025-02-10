import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from "@mui/material";
import { Model, MODELS } from "../../models/models";

type ModelSelectProps = {
    selectedModel: Model;
    onModelChange: (model: Model) => void;
    models: Model[];
};

export const ModelSelector = ({ selectedModel, onModelChange, models }: ModelSelectProps) => {
    return (
        <FormControl sx={{ minWidth: 250 }} size="small">
            <InputLabel sx={{ color: 'white' }}>Select Model</InputLabel>
            <Select
                value={selectedModel.id}
                onChange={(e) => {
                    const model = models.find(m => m.id === e.target.value);
                    if (model) onModelChange(model);
                }}
                label="Select Model"
                sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.5)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    backgroundColor: 'rgb(17,29,39)',
                }}
            >
                {models.map((model) => (
                    <MenuItem
                        key={model.id}
                        value={model.id}
                        sx={{
                            color: 'white',
                            backgroundColor: 'rgb(17,29,39)',
                            '&:hover': {
                                color: 'black',
                                backgroundColor: 'white',
                            },
                            '&.Mui-selected': {
                                color: 'white',
                                backgroundColor: 'rgb(17,29,39)',
                                '&:hover': {
                                    color: 'black',
                                    backgroundColor: 'white',
                                },
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography color="inherit" variant="subtitle1">
                                {model.provider}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8, color: 'inherit' }}>
                                {model.name}
                            </Typography>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};