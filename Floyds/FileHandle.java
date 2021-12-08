package epam;

import java.io.*;

public class FileHandle
{

    public void WriteOut(int[][] floyd)
    {
        boolean first = true;
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter("Floyd.txt"));
            int column;
            for (int i = 0; i < floyd.length; i++)
            {
                for (int c = 0; c < floyd.length; c++)
                {
                    if(floyd[i][c] != 0 || floyd[i][0] == 0 && first == true) {
                        column = floyd[i][c];
                        bw.write(String.valueOf(column));
                        first = false;
                    }
                }
                bw.newLine();
            }
            bw.flush();
            bw.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}