import bcrypt from 'bcryptjs'
import Account from '../models/account.js'

// Method GET
export async function getAccount(req, res) {
    try {
        const accounts = await Account.find()
        res.json(accounts)
    } catch (error) {
        res.status(500).json({ msg: 'Error retrieving accounts' })
    }
}

//Method all accounts
export async function getAllActiveAccounts(req, res ) {
    try{
        const account = await savingAccounts.find({status: 'available'})
        res.status(200).json(account)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

// Method POST
export async function postAccount(req, res) {
    const { client_document, access_key } = req.body;
    try {
        const account_number = (await Account.countDocuments()) + 1;

        const hashedAccessKey = await bcrypt.hash(access_key, 10);

        const account = new Account({
            account_number,
            client_document,
            opening_date: new Date(),
            balance: 0,
            access_key: hashedAccessKey
        });

        await account.save();

        res.status(201).json({ msg: 'Account created successfully', account_number });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ msg: 'Error creating account', error: error.message });
    }
}
// Deposit Money method
export async function depositMoney(req, res) {
    const { account_number, amount, access_key } = req.body;
    let msg = 'Money deposited';

    try {
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }

        const account = await Account.findOne({ account_number });
        if (!account) {
            throw new Error('Account not found');
        }

        const isMatch = await bcrypt.compare(access_key, account.access_key);
        if (!isMatch) {
            throw new Error('Incorrect access key');
        }

        account.balance += amount;
        await account.save();

        res.status(200).json({ msg });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Method retire money
export async function putRetire(req, res) {
    const { account_number, amount, access_key } = req.body;
    let msg = 'Successful Withdrawl';

    try {
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }

        const account = await Account.findOne({ account_number });
        if (!account) {
            throw new Error('Account not found');
        }

        const isMatch = await bcrypt.compare(access_key, account.access_key);
        if (!isMatch) {
            throw new Error('Incorrect access key');
        }

        if (account.balance >= amount) {

            account.balance -= amount;
        } else {
            throw new Error('Not enough money')
        }

        await account.save();

        res.status(200).json({ msg });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// DELETE method
export async function deleteAccount(req, res) {
    const id = req.params.id
    let msg = 'Account deleted'

    try {
        const account = await Account.findById(id)
        if (!account) {
            throw new Error('Account not found')
        }

        if (account.balance !== 0) {
            throw new Error('Cannot delete account with non-zero balance')
        }

        await Account.findByIdAndDelete(id)
        res.status(200).json({ msg })
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting account' })
    }
}