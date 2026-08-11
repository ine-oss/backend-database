// conroller is like   a  waiter who recives customer requst and gives rensponse  
// so in code word is ehwn the customer make a request and after making areduest 
// controller get the request and then it take it database and saya  is there 
// some information and takes rensonspe
import Notification from "../database/models/notification.js";//connects your code to datbase and without this code doesnt know where to read and save notification
// 1. Get all notifications for a specific user or getting all msg
export const getUserNotifications = async (req, res) => {//create a function that works when user ask for notification
    //export const: Makes this function available so other files in your project can use it.
   // async: Tells JavaScript that fetching data from a database takes time, so it needs to pause and wait for results without freezing the server.
   //req (Request): Contains data coming in from the user (like their User ID).
//res (Response): The object used to send data out back to the user.
  try {//Starts a "safe zone." Anything inside try will attempt to run normally. If the database crashes or loses connection, the code jumps straight to the catch block instead of crashing your entire website.
    const { userId } = req.params;//Pulls the userId out of the website URL. and stores it in userid
//Searches the database for notifications belonging to that specific user.
// await:Pauses the code until the database finishes searching and returns the records.
    const notifications = await Notification.findAll({
        //where: { userId }: Filters the results so you only get notifications where the column userId matches the ID from Line 3 (e.g., userId = 45).
      where: { userId },
      //order: [["createdAt", "DESC"]]: Sorts the list by the creation date in descending order (DESC), meaning the newest messages appear first.
      order: [["createdAt", "DESC"]] // Show newest notifications first
    });
    return res.status(200).json(notifications);//: Sends the found notifications back to the user's phone or browser. ,200 meaning everthing went fine,json(notifications) convers database result into json so the user can reed them
    //What it does: Runs only if something fails inside the try block (for example, if the database goes offline).
//status(500): Sends HTTP code 500 (Internal Server Error).
//.json({ error: error.message }): Sends back a simple message explaining what went wrong so the developer can fix it.
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

// 2. Create a new notification
export const createNotification = async (req, res) => {//create a function and then make sure is available to be used to other file,wait untill js is donne running 
  try {//prevents crashing if sth happen takes code to catch so the error can be shown to develper
//userId: Who should receive this notification.
//title: The headline (e.g., "Order Shipped!").
//message: The full text (e.g., "Your package is on the way.").
// type: The category (e.g., "promo", "alert", or "info").
    const { userId, title, message, type } = req.body;
    const newNotification = await Notification.create({
      userId,
      title,
      message,
      type: type || "info",
      isRead: false
    });

    return res.status(201).json(newNotification);//sending new created  notification to the  user
    //Runs only if an error happens in the try block (e.g., required database fields were missing).
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

// 3. Mark a single notification as read
export const markAsRead = async (req, res) => {//define function create function of mark as read
  try {//prevents crashes of the project
    const { id } = req.params;//pulling notification from website url to datbase
//Searches the database table for a row matching that primary key ID.
// findByPk(id): Short for "Find By Primary Key". It looks specifically for the item with ID 88
    const notification = await Notification.findByPk(id);
//if there is not send msg that notification is not found
    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }
    // This change has not reached the database yet. It only exists inside the running code on your server. If the server turned off right at this second, this change would be lost.
    notification.isRead = true;
    await notification.save();//What it does: Writes the updated object from your server's memory back into your SQL database (using an ORM like Sequelize).
// Sends back a confirmation message and the updated notification data to the app.
    return res.status(200).json({
      message: "Notification marked as read",
      notification
    });
    // Runs only if an error happens in the try block (e.g., required database fields were missing).
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

// 4. Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    await notification.destroy();

    return res.status(200).json({
      message: "Notification deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};