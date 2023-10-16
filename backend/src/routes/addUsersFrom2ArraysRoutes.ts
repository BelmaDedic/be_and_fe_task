import express from 'express';
import {
  mergeEmailsIntoPhoneNumbers,
  mergePhoneNumbersIntoEmails,
} from '../services/combineArraysService';

const router = express();

// Merging two given arrays and save it in database
router.get('/', async (req, res) => {
  try {
    await mergeEmailsIntoPhoneNumbers();
    await mergePhoneNumbersIntoEmails();
    res.json('Arrays are successfully merged!');
  } catch {
    res.json('Opps, there is some error..');
  }
});

module.exports = router;
