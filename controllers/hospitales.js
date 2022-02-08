const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {
    try {
        const hospitales = await Hospital.find()
            .populate('usuario', 'nombre img');

        res.json({
            ok: true,
            hospitales
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador.'
        });
    }
};

const crearHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador.'
        });
    }
};

const actualizarHospital = async (req, res = response) => {
    const { id } = req.params;
    const uid = req.uid;

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            res.status(404).json({
                ok: false,
                msg: 'No existe el registro.'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador.'
        });
    }
};

const borrarHospital = async (req, res = response) => {
    const { id } = req.params;

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            res.status(404).json({
                ok: false,
                msg: 'No existe el registro.'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'El hospital se ha eliminado.'
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
};