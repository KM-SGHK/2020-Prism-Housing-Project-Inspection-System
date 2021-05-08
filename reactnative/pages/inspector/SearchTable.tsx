import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Table, Row, TableWrapper } from 'react-native-table-component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { selectedFlat } from '../../redux/flat/IdSavingActions';
import { showSpace, showSelectedFlatInfo } from '../../redux/space/actions';

export function SearchTable() {
    const tableHead = ["Flat", "Size(sq. ft)", "Stage", "Last Modified", "Defects"];
    // const [tableData, setTableData] = useState([]);

    const tableData = useSelector((state:RootState)=> state.flatTable.result)
    const dispatch =  useDispatch();

    const onSelectedFlatId = (selectedFlatId) => {
        dispatch(selectedFlat(selectedFlatId))
    }

    const onShowSelectedFlatInfo = (selectedFlatId) => {
        dispatch(showSelectedFlatInfo(selectedFlatId))
      }

    const onShowSpaces = (selectedFlatId) => {
        dispatch(showSpace(selectedFlatId))
      }
      
    const navigation = useNavigation();

    const rowResult =
        tableData.map((rowData, index) => 
            <TouchableOpacity
                key={index}
                onPress={() =>{{
                    onSelectedFlatId((rowData.id.toString()))};
                    onShowSpaces(rowData.id.toString());
                    onShowSelectedFlatInfo(rowData.id.toString());
                    navigation.navigate("Space");
                }}
                style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
            >
                {/* <Row
                    data={rowData.floor}
                    textStyle={styles.tableText}
                    style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                /> */}
            <View style={styles.rowBlock}>    
            <Text>T{rowData.tower},{rowData.floor}{rowData.room}</Text>
            </View>
            <View style={styles.rowBlock}>
            <Text>{rowData.size_in_sq_ft}</Text>
            </View>
            <View style={styles.rowBlock}>
            <Text>1</Text>
            </View>
            <View style={styles.rowBlock}>
            <Text>{rowData.last_modified_date.toString().slice(0,10)}</Text>
            </View>
            <View style={styles.rowBlock}>
            <Text>{rowData.defects_total}</Text>
            </View>
            </TouchableOpacity>
        )

    return (
        <View style={styles.searchTableContainer}>
            <View>
                <Table borderStyle={styles.searchTableBorder}>
                    <Row data={tableHead} style={styles.tableHead} textStyle={styles.tableText} />
                </Table>
                <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={styles.searchTableBorder}>
                        {rowResult}
                    </Table>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchTableContainer: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#efefef',
    },
    searchTableBorder: {
        borderBottomWidth: 2,
        borderColor: '#000'
    },
    tableHead: {
        height: 50,
        backgroundColor: '#333333',
    },
    tableText: {
        textAlign: 'center',
        fontWeight: '700',
        color: '#ffffff'
    },
    dataWrapper: {
        marginTop: -1,
    },
    row: {
        height: 50,
        flex:5,
        backgroundColor: '#E7E6E1',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
    },
    rowBlock:{
        flex: 1,
        justifyContent:'center',
        flexDirection: 'row'
    }

});