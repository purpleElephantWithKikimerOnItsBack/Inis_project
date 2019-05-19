package model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PhotoPosts {
    public static List<String> collection = new ArrayList<String>(Arrays.asList(
            "{\"id\":\"1\",\"description\":\"this is alien. he's flying. i want same things\",\"createdAt\":\"2019-03-05T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/alien.jpg\",\"hashTags\":[\"alien\",\"space\",\"absolutechill\"],\"likes\":[\"alienlover\"]}",
            "{\"id\":\"2\",\"description\":\"more aliens. they're cool\",\"createdAt\":\"2019-03-05T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/aliens.jpg\",\"hashTags\":[\"alien\",\"morealiens\",\"halfinvisible\",\"absolutechill\"],\"likes\":[\"alienlover1\",\"alienlover2\"]}",
            "{\"id\":\"3\",\"description\":\"hell idk what the F is it. crazy girls\",\"createdAt\":\"2019-03-05T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/bubble.jpg\",\"hashTags\":[\"flygirlfly\",\"bubble\",\"senseless\"],\"likes\":[\"one\",\"two\",\"three\"]}",
            "{\"id\":\"4\",\"description\":\"whale in the air. i like it\",\"createdAt\":\"2019-03-05T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/whale.jpg\",\"hashTags\":[\"whale\",\"air\",\"smallgirlmmmnice\"],\"likes\":[\"friendOne\",\"friendTwo\",\"friendThree\",\"ohIronic\",\"iHaveNoFriends\"]}",
            "{\"id\":\"5\",\"description\":\"man i really don't know what is it. it's mental\",\"createdAt\":\"2019-03-05T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/girl_on_bicycle.jpg\",\"hashTags\":[\"idk\",\"hellwhatisit\"],\"likes\":[]}",
            "{\"id\":\"6\",\"description\":\"reptiloids yeah. perfect world.\",\"createdAt\":\"2019-03-05T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/reptiloids.jpg\",\"hashTags\":[\"reptiloids\",\"imaginaryandperfect\",\"awesome\"],\"likes\":[\"reptiloidman\",\"reptiloidwoman\"]}",
            "{\"id\":\"7\",\"description\":\"pure spaceman. hope he's fine\",\"createdAt\":\"2019-03-07T00:00:00.000Z\",\"author\":\"2cupsofrolton\",\"photoLink\":\"images/spaceman.jpg\",\"hashTags\":[\"spaceman\",\"hopenotdead\",\"helpthispureguy\",\"callambulance\"],\"likes\":[\"funeralCeremony\"]}",
            "{\"id\":\"8\",\"description\":\"flying mechas. and a lady. maybe made of flesh. who knows.\",\"createdAt\":\"2019-03-05T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/mecha.jpg\",\"hashTags\":[\"supra\",\"bird\",\"fleshgirl\"],\"likes\":[]}",
            "{\"id\":\"9\",\"description\":\"birdman. looks nice. he's awesome and he can fly. not many of you can.\",\"createdAt\":\"2019-03-05T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/birdman.jpg\",\"hashTags\":[\"birdman\",\"absolutebeauty\",\"feathers\"],\"likes\":[\"birdiesFamily\"]}",
            "{\"id\":\"10\",\"description\":\"dolphin-man? dolphin-woman? nobody know. luckily.\",\"createdAt\":\"2019-03-06T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/dolphin.jpg\",\"hashTags\":[\"halfdolphin\",\"halfhuman\",\"sea\"],\"likes\":[]}",
            "{\"id\":\"11\",\"description\":\"man is buying some stuff. why not.\",\"createdAt\":\"2019-03-10T00:00:00.000Z\",\"author\":\"andy\",\"photoLink\":\"images/shopping.jpg\",\"hashTags\":[\"hollyshit\",\"hisheadinhispalm\",\"nothingtoworryabout\"],\"likes\":[\"Rublevsky\",\"Evroopt\"]}",
            "{\"id\":\"12\",\"description\":\"maybe it's the reality\",\"createdAt\":\"2019-03-10T00:00:00.000Z\",\"author\":\"christopher\",\"photoLink\":\"images/alien_chilling.jpg\",\"hashTags\":[\"alien\",\"spaceman\",\"lilsad\"],\"likes\":[\"alienlover1\",\"alienlover2\",\"alienlover3\"]}",
            "{\"id\":\"13\",\"description\":\"love to go outside on sunday mornings\",\"createdAt\":\"2019-03-11T00:00:00.000Z\",\"author\":\"jhoanna\",\"photoLink\":\"images/planet_walking.jpg\",\"hashTags\":[\"space\",\"planetunderthefoot\",\"walkingday\"],\"likes\":[\"jupiter\",\"saturn\",\"earth\"]}",
            "{\"id\":\"14\",\"description\":\"kinda creepy\",\"createdAt\":\"2019-03-12T00:00:00.000Z\",\"author\":\"jon\",\"photoLink\":\"images/my_friends_aliens.jpg\",\"hashTags\":[\"nicefaces\",\"morealiens\"],\"likes\":[\"alienlover1488\"]}",
            "{\"id\":\"15\",\"description\":\"yee haw\",\"createdAt\":\"2019-03-12T00:00:00.000Z\",\"author\":\"alcoholic\",\"photoLink\":\"images/why_not.jpg\",\"hashTags\":[\"thatsinteresting\",\"tryingfirsttime\"],\"likes\":[\"nicetry\"]}",
            "{\"id\":\"16\",\"description\":\"another picture of aliens making smth weird.\",\"createdAt\":\"2019-03-12T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/pretty_f_awesome.jpg\",\"hashTags\":[\"reptiloids\",\"imaginaryandperfect\",\"awesome\"],\"likes\":[\"horsehunter\",\"misanthrope\"]}",
            "{\"id\":\"17\",\"description\":\"going craaaaazyyy\",\"createdAt\":\"2019-03-13T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/its_me.jpg\",\"hashTags\":[\"me\",\"myself\",\"and\",\"i\"],\"likes\":[\"wannadie\"]}",
            "{\"id\":\"18\",\"description\":\"looks beautiful. men can fly.\",\"createdAt\":\"2019-03-13T00:00:00.000Z\",\"author\":\"jhonny\",\"photoLink\":\"images/death_playing.jpg\",\"hashTags\":[\"deathitself\",\"flyingman\",\"theendofhopes\"],\"likes\":[\"literallyeveryone\"]}",
            "{\"id\":\"19\",\"description\":\"tshhhh, dont cry. you will not escape your destiny\",\"createdAt\":\"2019-03-13T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/keep_going.jpg\",\"hashTags\":[\"thatsit\",\"lastphotoofher\",\"goodbyeprettywoman\"],\"likes\":[\"goesdownthestreetpreetywoman\"]}",
            "{\"id\":\"20\",\"description\":\"marvellous view from here\",\"createdAt\":\"2019-03-14T00:00:00.000Z\",\"author\":\"kikimer\",\"photoLink\":\"images/yeah_lets_have_a_fun_time.jpg\",\"hashTags\":[\"earth\",\"chill\"],\"likes\":[\"flatyearthcommunity\",\"kikimer\"]}"
    ));
}
