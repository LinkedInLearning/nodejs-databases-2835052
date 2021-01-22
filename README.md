# Databases for Node.js Developers
This is the repository for the LinkedIn Learning course Databases for Node.js Developers. The full course is available from [LinkedIn Learning][lil-course-url].

Node.js developers often consider MongoDB to be their main choice when building a data-driven application—but many alternatives may provide better solutions. In this course, learn about the various database options available for Node.js applications, so that you can select the right database for your app. Daniel Khan reviews the basics of relational and nonrelational databases, and explains how—and when—to use document databases with Node.js. He also covers using key-value stores and relational databases with Node.js, demonstrating how to work with MySQL and Sequelize.

### Skills covered in this course

- Node.js
- Databases
- MongoDB
- MySQL
- Redis
- Mongoose
- Sequelize

## Instructions
This repository has branches for each of the videos in the course. You can use the branch pop up menu in github to switch to a specific branch and take a look at the course at that stage, or you can add `/tree/BRANCH_NAME` to the URL to go to the branch you want to access.

## Branches
The branches are structured to correspond to the videos in the course. The naming convention is `CHAPTER#_MOVIE#`. As an example, the branch named `02_03` corresponds to the second chapter and the third video in that chapter. 
Some branches will have a beginning and an end state. These are marked with the letters `b` for "beginning" and `e` for "end". The `b` branch contains the code as it is at the beginning of the movie. The `e` branch contains the code as it is at the end of the movie. The `main` branch holds the final state of the code when in the course.

When switching from one exercise files branch to the next after making changes to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue:
	
    Add changes to git using this command: git add .
	Commit changes using this command: git commit -m "some message"

## Folders

The files are divided into two folders, which represent two separate projects:

- The `maxcoin` folder contains a simple project that uses databases to store and retrieve bitcoin data.
- The `shopper` folder contains a simple e-commerce application that you will build out throughout this course.

## Installing

1. To use these exercise files, you must have the following installed:

   - Node.js ^12.13.0 (LTS) or higher
   - npm

2. Clone this repository into your local machine using the terminal (Mac), CMD (Windows), or a GUI tool like SourceTree.
3. Open the folder for your repository clone in your code editor.
4. Navigate to the folder for your repository clone in terminal or CMD.
5. Change into `maxcoin` and run `npm install`
6. Change into shopper and run `npm install`


### Instructor

**Daniel Khan**

_Technology Lead, Developer, Application Architect_

Check out my other courses on [LinkedIn Learning](https://www.linkedin.com/learning/instructors/daniel-khan?u=104).

[lil-course-url]: https://www.linkedin.com/learning/databases-for-node-js-developers-2
