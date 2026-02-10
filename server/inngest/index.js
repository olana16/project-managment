import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "project-managment" });


//inngest function to save user data to a database
const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    {event: 'clerk/user.created'},
    async({event})=>{
        const {data} = event
        await prisma.user.create({
            data:{
                id: data.id,
                email: data.email_addresses[0]?.email_addres,
                name: data?.first_name + " " + data?.last_name,
                image: data?.image_url,


            }
        })
    }
)

//inngest function to delete user from database
const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-from-clerk'},
    {event: 'clerk/user.deleted'},
    async({event})=>{
        const {data} = event
        await prisma.user.create({
            where:{
                id: data.id,
            }
        })
    }
)



// Create an empty array where we'll export future Inngest functions
export const functions = [];