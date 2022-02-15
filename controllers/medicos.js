const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
    try {
        const medicos = await Medico.find()
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            medicos
        });   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador.'
        });
    }
};

const crearMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador.'
        });
    }
};

const actualizarMedico = async (req, res = response) => {
    const { id } = req.params;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            res.status(404).json({
                ok: false,
                msg: 'No existe el registro.'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador.'
        });
    }
};

const borrarMedico = async (req, res = response) => {
    const { id } = req.params;

    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el registro.'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'El medico se ha eliminado.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador.'
        });
    }
};

const obtenerMedico = async (req, res = response) => {
    const { id } = req.params;

    try {
        const medico = await Medico.findById(id)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el registro.'
            });
        }

        res.json({
            ok: true,
            medico
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador.'
        });
    }
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    obtenerMedico
};