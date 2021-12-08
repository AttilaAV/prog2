package epam;

public class Calculation extends FileHandle
{
    public void calc(int num)
    {
        int[][] container = new int[num][num];
        int number = num;
        int sum = 0;
        int leap = 0;
        int index = 0;
        for (int i = 0; i <= number; i++)
        {
            for(int c = 0; c < leap; c++){
                System.out.print(index);
                sum = sum+index;
                container[i-1][c] = index;
                index++;
            }
            leap++;
            System.out.println();
        }
        System.out.format("%20d",sum);
        WriteOut(container);
    }
}