const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase');

// ─── [GET] /api/categorias ────────────────────────────────────
router.get('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('categorias')
            .select('*') // Garante que traz o ID e o NOME
            .order('id', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        next(err);
    }
});

// ─── [POST] /api/categorias ───────────────────────────────────
router.post('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('categorias')
            .insert([{ nome: req.body.nome }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        next(err);
    }
});

//PUT
 router.put ('/:id', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('categorias')
            .update({ nome: req.body.nome })
            .eq('id', id)
            .select();

        if (error) throw error;

        if (data && data.length > 0) {
            res.json(data[0]);
        } else {
            res.status (404).json({ mensagem: 'Categoria não enconrada para atualizar'});
        }
    } catch (err) {
        next(err);
    }
});

//DELETE

router.delete ('/:id', async (req, res, next) => {
    try {
            const {id} = req.params;
        const { data, error } = await supabase
            .from('categorias')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.json({mensagem: 'Categoria deletada com sucesso'});
    } catch (err) {
        next(err);
    }
});

module.exports = router;
