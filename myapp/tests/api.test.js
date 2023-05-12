const { dbConnection, dbConnectionClose } = require("../providers/config-mongo");
const { Driver } = require("../schemas/driver");
const { User } = require("../schemas/user");


beforeAll(
    async () => {
        await  dbConnection();
    }
);

afterAll(
    async () => {
        await  dbConnectionClose();
    }
);

describe('User Test', () => {

    const user = new User({ name:`user`, lastname:`lastname`, email: `email@user.com`, cellphone:5555555550,intravel :true });

    test('Create User', async () => {

        
        await user.save();
        
        expect(user.name).toEqual('user');
        expect(user.status).toEqual(true);

    })

    test('Read User', async () => {

        const userRead = await User.findById(user._id);

        expect(userRead.name).toEqual('user');
        expect(userRead.status).toEqual(true);

    })

    test('Update User', async () => {

        const userUpdate = await User.findByIdAndUpdate( user._id, {name:'newName'} , {returnDocument: 'after'});
        expect(userUpdate.name).toEqual('newName');

    })

    test('Delete User', async () => {

        await User.findByIdAndDelete( user._id , {returnDocument: 'after'});
        const userRead = await User.findById(user._id);
        expect(userRead).toEqual(null);

    })
})

describe('Driver Test', () => {

    const driver = new Driver({ name:`driver`, lastname:`lastnameDriver`, email: `emailDriver@taxi24.com`, cellphone:5555555550 , 
                                 latitude:19.517494, longitude: -99.0121012 });
    

    test('Create Driver', async () => {

        
        await driver.save();
        
        expect(driver.name).toEqual('driver');
        expect(driver.status).toEqual(true);

    })

    test('Read Driver', async () => {

        const driverRead = await Driver.findById(driver._id);

        expect(driverRead.name).toEqual('driver');
        expect(driverRead.status).toEqual(true);

    })

    test('Update Driver', async () => {

        const driverUpdate = await Driver.findByIdAndUpdate( driver._id, {name:'newName'} , {returnDocument: 'after'});
        expect(driverUpdate.name).toEqual('newName');

    })

    test('Delete Driver', async () => {

        await Driver.findByIdAndDelete( driver._id , {returnDocument: 'after'});
        const driverRead = await Driver.findById(driver._id);
        expect(driverRead).toEqual(null);

    })
})
