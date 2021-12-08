package epam;

import java.util.Scanner;

public class UserInput extends Calculation
{
    public int inputN;
    public void Read()
    {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter an Integer ");
        int input = scanner.nextInt();
        System.out.println(input);
        if(input < 0) {
            do {
                System.out.flush();
                System.out.println("Enter a positive Integer");
                System.out.print("Enter an Integer: ");
                input = scanner.nextInt();
            }
            while(input < 0);
        }
        scanner.close();
        inputN = input;
        Calculation calculation = new Calculation();
        calculation.calc(inputN);
    }
}