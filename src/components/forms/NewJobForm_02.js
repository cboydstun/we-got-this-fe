import React, { useState, useEffect } from 'react';
import { useStateValue, withState } from '../../state';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    MenuItem,
    Paper,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
} from '@material-ui/core';
import { actions as customerActions } from '../../state/customer/customerActions';
import { actions as jobActions } from '../../state/jobs/jobsActions';
import { withFormik, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { createTimes, durations } from '../../constants/times';
import SplashLoading from '../loading/SplashLoading';

import MuiSingleSelectInput from '../formItems/MuiSingleSelectInput';


const NewJobForm_02 = () => {
    const [loading, setLoading] = useState(true);
    const [{ jobs }, dispatch] = useStateValue();

    const typeOptions = [
        'Recurring',
        'Groupon',
        'One-off',
        'Initial Assessment',
    ];

    //
    //If the times haven't been generated yet, generate them based on the slot
    //on the calendar that has been selected
    let day = (jobs.slotEvent && jobs.slotEvent.start) || null;
    let times = createTimes(day);

    return (
        <>
            <DialogContent>
                {isSubmitting ? (
                    <SplashLoading />
                ) : (
                    <Formik
                        initialValues={{
                            arrivalWindowStart: '',
                            arrivalWindowEnd: '',
                            duration: '',
                            cleaningType: '',
                        }}
                        validationSchema={Yup.object().shape({
                            arrivalWindowStart: Yup.string().required(),
                            arrivalWindowEnd: Yup.string().required(),
						})}
						onSubmit={(values, {setSubmitting, resetForm}) => {
							setSubmitting(true);
							console.log(values);
							resetForm();
						}}
                    >
                        <Form>
                            <Paper>Hello</Paper>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Typography>Create New Job</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiSingleSelectInput
                                        name="arrivalWindowStart"
                                        label="Arrival Window Start"
                                        data={times}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiSingleSelectInput
                                        name="arrivalWindowEnd"
                                        label="Arrival Window End"
                                        data={times}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiSingleSelectInput
                                        name="arrivalWindowEnd"
                                        label="Arrival Window End"
                                        data={durations}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiSingleSelectInput
                                        name="arrivalWindowEnd"
                                        label="Arrival Window End"
                                        data={typeOptions}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Schedule Job
                            </Button>
                        </Form>
                    </Formik>
                )}
            </DialogContent>
        </>
    );
};


export default 
