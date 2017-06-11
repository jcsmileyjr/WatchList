var app = angular.module('myApp', ['ui.bootstrap']);

app.controller('ctrlSearch', function($scope, $window, $http, $filter){
    
    $scope.suspectsData = [{"date":"2013-12-07T06:00:00.000Z","lName":"Smith","fName":"John","crime":"Bet Capping","casino":"Tunica Hollywood Casino","action":"Arrested by Agent","agentlName":"Crocker","agentfName":"Betty","details":"On December 7, 2013, John Smith was Bet Capping at Tunica Hollywood Casino and was Arrested by Agent. Agent Betty Crocker provided the following details: Mr. Smith, SSN: 444-78-0943, was repeatedly warned about his actions. He was arrested on 12-5-17."},{"date":"2011-09-14T05:00:00.000Z","lName":"Bunyan","fName":"Paul","crime":"Minor Gaming","casino":"Biloxi IP Casino","action":"Given a Minor Gaming Ticket","agentlName":"Crocket","agentfName":"Davy","details":"On September 14, 2011, Paul Bunyan was Minor Gaming at Biloxi IP Casino and was Given a Minor Gaming Ticket. Agent Davy Crocket provided the following details: Mr. Bunyan, DOB: 4-5-2002, was brought to the casino to gamble by his father Big Bunyan."},{"date":"2011-09-14T05:00:00.000Z","lName":"Bunyan","fName":"Big","crime":"Contributing to a Minor Gaming","casino":"Biloxi IP Casino","action":"Given a Minor Gaming Ticket","agentlName":"Crocket","agentfName":"Davy","details":"On September 14, 2011, Big Bunyan was Contributing to a Minor Gaming at Biloxi IP Casino and was Given a Minor Gaming Ticket. Agent Davy Crocket provided the following details: Mr. Bunyan of Salt Lake City, Utah allow his minor son, Paul Bunyan, to gamble. Big Bunyan is 9 feet tall, W/M, and has grey hair."},{"date":"2013-02-05T06:00:00.000Z","lName":"Brinkman","fName":"Peter","crime":"Bet Capping","casino":"Biloxi Tresure Bay Casino","action":"Warned by Casino","agentlName":"Cooper","agentfName":"Bob","details":"On February 5, 2013, Peter Brinkman was Bet Capping at Biloxi Tresure Bay Casino and was Warned by Casino. Agent Bob Cooper provided the following details: Mr. Brinkman of Mobile, AL (W/M) was intoxicated. He was caught bet capping $5."},{"date":"2005-03-13T06:00:00.000Z","lName":"Walters","fName":"Barbara","crime":"Past Posting","casino":"Biloxi Horseshoe Casino","action":"Warned by Agent","agentlName":"Teller","agentfName":"Susan","details":"On March 13, 2005, Barbara Walters was Past Posting at Biloxi Horseshoe Casino and was Warned by Agent. Agent Susan Teller provided the following details: Mrs. Walters, W/F, has been warned before in Tunica,MS for past posting. This is her final warning."},{"date":"2002-12-26T06:00:00.000Z","lName":"Walters","fName":"Barbara","crime":"Past Posting","casino":"Tunica Roadhouse Casino","action":"Warned by Casino","agentlName":"Stalone","agentfName":"Casey","details":"On December 26, 2002, Barbara Walters was Past Posting at Tunica Roadhouse Casino and was Warned by Casino. Agent Casey Stalone provided the following details: Mrs. Walters, W/F, was caught past posting two green chips."},{"date":"2012-06-14T05:00:00.000Z","lName":"Brown","fName":"Bobby","crime":"Pinching the Bet","casino":"Biloxi Horseshoe Casino","action":"Warned by Agent","agentlName":"Turner","agentfName":"Tina","details":"On June 14, 2012, Bobby Brown was Pinching the Bet at Biloxi Horseshoe Casino and was Warned by Agent. Agent Tina Turner provided the following details: Mr. Brown, 6'5 B/M, was drunk and super rich. The casino does not want to charges pressed for multiple $100 chip pinching of bets and repeated warnings."}];

    /*array of deleted suspects  */
    $scope.removedSuspects = [];
    
    /*Pre-Sets sortBy variable to decending order by date*/
    $scope.sortBy = "-date";
 
    /*array containing casino names that is bind with susCasino when adding new suspects to the inputCasino field*/
    $scope.casinoNames = ["Tunica Horseshoe Casino", "Tunica Roadhouse Casino", "Tunica Goldstrike Casino", "Tunica Bally Casino", "Tunica Fitz Casino", "Tunica Sam's Town Casino", "Tunica Hollywood Casino", "Tunica Resorts Casino", "Biloxi Horseshoe Casino", "Biloxi IP Casino", "Biloxi Tresure Bay Casino"];
    
     /*array containing casino names that is bind with susCasino when adding new suspects to the inputCasino field*/
    $scope.actionTaken = ["Warned by Casino", "Warned by Agent", "Arrested by Agent", "Given a Minor Gaming Ticket"];
    
    /*array containing casino names that is bind with susCasino when adding new suspects to the inputCasino field*/
    $scope.crimes = ["Bet Capping", "Pinching the Bet", "Past Posting", "Minor Gaming", "Contributing to a Minor Gaming"];
    
    /*sets narrative varible to "blank" so clear narrative function dosen't show before showNarrative is called*/
    $scope.narrative = "";
    
	/*Creates a "showNarrative" method in the ctrlSearch scope that binds the passed argument "x" to the clicked "suspect" details information*/
	$scope.showNarrative = function(x){
	  $scope.narrative = x;
	}
	
	/*Creates a "clearNarrative" method in the ctrlSearch scope that clears/resets the narrative variable by setting it to blank*/
	$scope.clearNarrative = function(){
	  $scope.narrative = "";   
	}	
	
	/*reset method n the ctrlSearch scope that  sets each variable to a blank slate  */
    $scope.resetAddSuspectFields = function(susDate, suslName, susfName, susCrime, susCasino, susAction, susAgentlName, susAgentfName, susDetails){
        $scope.susDate = "";
        $scope.suslName = "";
        $scope.susfName = "";
        $scope.susCrime = "";
        $scope.susCasino = "";
        $scope.susAction = "";
        $scope.susAgentlName= "";
        $scope.susAgentfName= "";
        $scope.susDetails = "";
    }
	
	/*addSuspect method in the ctrlSearch scope that create new suspects. Use variables from addSuspect input fields */
	$scope.addSuspect = function (susDate, suslName, susfName, susCrime, susCasino, susAction, susAgentlName, susAgentfName, susDetails) {
	    
	    /*replace date pattern from long form to standard format */
	    $scope.newDate = $filter('date')($scope.susDate, 'MMMM d, y');
	    
	    /*create a standardize format for the narrative based on all inputted data*/
	    $scope.standardNarrative = "On "+$scope.newDate+", "+$scope.susfName+ " "+ $scope.suslName+" was "+$scope.susCrime+" at "+$scope.susCasino+" and was "+$scope.susAction+". Agent "+$scope.susAgentfName+" "+ $scope.susAgentlName+" provided the following details: "+$scope.susDetails;
	    
	    /*assign addSuspect input fields variable to newSuspect object */
	    $scope.newSuspect = {date:$scope.susDate, lName:$scope.suslName, fName:$scope.susfName, crime:$scope.susCrime, casino:$scope.susCasino, action:$scope.susAction, agentlName: $scope.susAgentlName, agentfName: $scope.susAgentfName, details:$scope.standardNarrative};

        /*push newSuspect object into suspects array */
        $scope.suspectsData.push($scope.newSuspect);

        /*creates a success message with newSuspect name */
        $scope.success = "Successfully Added " + $scope.susfName + " " + $scope.suslName;
        
        /* Resets all addSuspect fields */
        $scope.susDate = "";
        $scope.suslName = "";
        $scope.susfName = "";
        $scope.susCrime = "";
        $scope.susCasino = "";
        $scope.susAction = "";
        $scope.susAgentfName= "";
        $scope.susAgentlName= "";
        $scope.susDetails = "";
        
        /*if add suspect is a success, then show success message on "search suspect" page*/
        $scope.showSuccess = true;
        
        /*switch view from 'add suspect' page to 'search suspect' page*/
        $scope.setView('search');
        
    }/*End of addSuspect function*/
    
    $scope.logIn = function(x){
        $scope.logInPwd = x;

        /*if the return is a 1, then it passes*/
        if($scope.logInPwd == "MGCROCKS"){
            $scope.enableNav = true;
            $scope.setView('search');
            }/*End of if true statement*/
        else {
            /*Displayed password failed message*/
            $scope.fail = "Password Failed";
            }/*End of if failed statement  */
        
        
    }/*End of logIn function*/
    
    /*First part sets up potential deleted suspect by taking index of current suspect with varible "x", searching for that index array element in suspectsData
     with method indexOf, then placing that suspect data in varible foundSuspect. Information like first and last name is used and the view is change to deletePage.
     Second part is a delete function that takes user entered password from delete page for server-side validation. If it passes, then foundSuspect is splice from suspectsData array
     locally, then updated to the server. A successful deletion along with name is posted ont the search page and the user is re-directed there. 
    */
    $scope.deleteSuspect = function(x){
        /*creates an empty "found " variable to hold index of selected deleted suspect */
        $scope.foundSuspect = "";
        
        /*if true, the index of "x" ("x" repersents current selected suspect) is found in the suspects array and placed in variable "foundSuspect"*/
        $scope.foundSuspect = $scope.suspectsData.indexOf(x);
        /*set current selected suspect first and last name*/
        $scope.deletelName = x.lName;
        $scope.deletefName = x.fName;
        /*set the password variable, use to validate user entered pwd from the server, to a array. This returns a pass or fail*/
        $scope.password = [];
        /*change the view to the deletePage*/
        $scope.setView('deletePage');

        /*when user press submit button on deletePage, this function takes entered pwd as a array newPwd, validate it on the server, and returns a 1 or blank.*/
        $scope.delete = function(pwd){
            /*set user enter password to newPwd variable*/
            $scope.newPwd = (pwd);
        
                /*if the return is a 1, then it passes*/
                if($scope.password == "Wiselogel"){

                /*using the index number in the foundSuspect variable, the selected suspect is slice from the suspects array*/
                $scope.suspectsData.splice($scope.foundSuspect, 1);
            
                /*creates a success message with foundSuspect name */
                $scope.success = $scope.deletefName + " " + $scope.deletelName + " has been deleted.";
            
                /*if add suspect is a success, then show success message on "search suspect" page*/
                $scope.showSuccess = true;
        
                /*the selected deleted suspect is placed variable "oldSuspect" to facilitate moved to removedSuspects array*/
                $scope.oldSuspect = x;
            
                /*the selected deleted suspect is placed inside the removedSuspect array*/
                $scope.removedSuspects.push($scope.oldSuspect);
            
                $scope.setView('search');
            }/*End of if true statement*/
        else {
            /*Displayed password failed message*/
            $scope.fail = "Password Failed";
            }/*End of if failed statement  */
    }/*end of delete function*/
    
    }/*End of deleteSuspect function */
    
    /*disable the nav links when the app starts. Forces user to use the login page*/
    $scope.enableNav = false;
    
    /*function to toggle the add suspect or search suspect pages using the nav. Each html page div have the ng-show set to a view variable. */
    /*The nav links run the setView method with the same ng-show variable.*/
    $scope.setView = function(view){
        /*enable the nav links if this varible is true after login*/
        if($scope.enableNav==true){
        
        /*or use $location.path() for page redirect*/
        /*the varible view is set to the ng-show in each view*/
        $scope.view = view;
        
        /*Re-collapsed the mobile menu by takeing the global variable isCollapsed and assign it the value true*/
        $scope.isCollapsed = true;
        }
        else {
           $scope.view = 'logInPage';
        }
    }
    
    /*the starting page is set to the login page*/
    $scope.setView('logInPage');

    /*I forgot to note where i got this fix but a better/cleaner fix is at https://scotch.io/tutorials/how-to-correctly-use-bootstrapjs-and-angularjs-together and notes at https://angular-ui.github.io/bootstrap/#!#getting_started*/
    /*In mobile view, the menu is un-collapsed by assign the global variable isCollapsed to true, */
    $scope.isCollapsed = true;
    
});/*End of ctrlSearach*/

/*A beter way to control data for the above is to use a json file with httpExample or http service and the "resolve" method to return data to controller */

/* Got notes from https://www.pluralsight.com/blog/tutorials/angularjs-step-by-step-services on building a factory/service*/
/*A factory is use to return something. Like a value on demand for controllers*/
